import { pki, type Base64 } from 'node-forge';
import { SignedXml } from 'xml-crypto';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import { loadCertificate } from '../validate/processCertificate.util';

export function signedEventXml(
  xml: string,
  pfxBuffer: Base64,
  pass: string,
  chave_acesso: string,
  tagAssinada: string // geralmente "infEvento"
) {
  try {
    // Inicializa os parsers e builder
    const parser = new XMLParser();

    const builder = new XMLBuilder();

    // Verifica se o XML é válido
    parser.parse(xml);

    const { cert, privateKey } = loadCertificate(pfxBuffer, pass);

    if (!cert || !privateKey) {
      throw new Error('Certificado ou chave privada não encontrados no arquivo PFX');
    }

    const certPem = pki.certificateToPem(cert);
    const sig = new SignedXml({
      privateKey: pki.privateKeyToPem(privateKey),
      signatureAlgorithm: 'http://www.w3.org/2000/09/xmldsig#rsa-sha1',
      canonicalizationAlgorithm: 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315',
      publicCert: certPem,
      implicitTransforms: ['http://www.w3.org/TR/2001/REC-xml-c14n-20010315'],
    });

    // Adiciona referência para a assinatura
    sig.addReference({
      uri: `#${chave_acesso}`,
      xpath: `//*[local-name(.)='${tagAssinada}']`,
      digestAlgorithm: 'http://www.w3.org/2000/09/xmldsig#sha1',
      transforms: [
        'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
        'http://www.w3.org/TR/2001/REC-xml-c14n-20010315',
      ],
    });

    sig.computeSignature(xml);
    const signedXmlFull = sig.getSignedXml();

    const signatureXml = signedXmlFull.match(/<Signature[\s\S]*?<\/Signature>/)?.[0];
    if (!signatureXml) {
      throw new Error('Não foi possível extrair a tag <Signature> do XML assinado.');
    }

    // Inserir assinatura após </infEvento>
    const closingTag = `</${tagAssinada}>`;
    const insertAt = xml.indexOf(closingTag) + closingTag.length;

    const xmlWithSignature = xml.slice(0, insertAt) + signatureXml + xml.slice(insertAt);

    return xmlWithSignature;
  } catch (err: any) {
    console.error('Erro na função signedXml:', err);
    throw err;
  }
}
