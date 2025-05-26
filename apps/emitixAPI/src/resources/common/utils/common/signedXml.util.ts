import { pki, type Base64 } from 'node-forge';
import { SignedXml } from 'xml-crypto';
import { XMLParser } from 'fast-xml-parser';
import { loadCertificate } from '../validate/processCertificate.util';

export function signedXml(
  xml: string,
  pfxBuffer: Base64,
  pass: string,
  chave_acesso: string,
  aboveTag: string,
) {

  const parser = new XMLParser({
    ignoreAttributes: false,
    allowBooleanAttributes: true,
  });
  if(!parser.parse(xml)) throw new Error('Erro ao fazer o parse do XML');
  if (chave_acesso !== "") {
    if (chave_acesso && ![43, 44, 54].includes(chave_acesso.length)) {
      throw new Error(`Chave de acesso inválida (esperado 43 (Chave de acesso de inutilização) ou 44 (Chave de acesso NFE) ou 54 (Chave de acesso de evento)  dígitos, recebeu ${chave_acesso.length})`);
    }
  }

  const { cert, privateKey } = loadCertificate(pfxBuffer, pass);

  if (!cert || !privateKey) {
    throw new Error(
      'Certificado ou chave privada não encontrados no arquivo PFX',
    );
  }

  const certPem = pki.certificateToPem(cert);
  const certBase64 = certPem
    .replace('-----BEGIN CERTIFICATE-----', '')
    .replace('-----END CERTIFICATE-----', '')
    .replace(/\r?\n|\r/g, '');

  const sig = new SignedXml({
    privateKey: pki.privateKeyToPem(privateKey),
    signatureAlgorithm: 'http://www.w3.org/2000/09/xmldsig#rsa-sha1',
    canonicalizationAlgorithm:
      'http://www.w3.org/TR/2001/REC-xml-c14n-20010315',
    publicCert: certPem,
    implicitTransforms: ['http://www.w3.org/TR/2001/REC-xml-c14n-20010315'],
  });

  sig.addReference({
    uri: `#${chave_acesso}`,
    xpath: `//*[local-name(.)='${aboveTag}']`,
    digestAlgorithm: 'http://www.w3.org/2000/09/xmldsig#sha1',
    transforms: [
      'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
      'http://www.w3.org/TR/2001/REC-xml-c14n-20010315',
    ],
  });

  sig.signatureAlgorithm = 'http://www.w3.org/2000/09/xmldsig#rsa-sha1';
  sig.computeSignature(xml);

  const signedXmlResult = sig.getSignedXml();
  const signin = sig.getSignatureXml();
  return signedXmlResult
}
