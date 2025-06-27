import { pki, type Base64 } from 'node-forge';
import { SignedXml } from 'xml-crypto';
import type { CertificateService } from '../../../certificate/certificate.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignedEventXml {

  private readonly privateKey: pki.PrivateKey
  private readonly certificateService: CertificateService
  constructor(
    privateKey: pki.PrivateKey,
    certificateService: CertificateService
  ) {
    this.privateKey = privateKey
    this.certificateService = certificateService
  }

  async signEvent(xml: string, pfxBuffer: Base64, pass: string, chave_acesso: string, tagAssinada: string) {
    const cert = await this.certificateService.validateCertificate(pfxBuffer, pass)
    if (!cert || !cert.cert) {
      throw new Error('Certificado não encontrado')
    }
    const certPem = pki.certificateToPem(cert.cert)
    const sig = new SignedXml({
      privateKey: pki.privateKeyToPem(this.privateKey),
      signatureAlgorithm: 'http://www.w3.org/2000/09/xmldsig#rsa-sha1',
      canonicalizationAlgorithm: 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315',
      publicCert: certPem,
      implicitTransforms: ['http://www.w3.org/TR/2001/REC-xml-c14n-20010315'],
    })

    sig.addReference({
      uri: `#${chave_acesso}`,
      xpath: `//*[local-name(.)='${tagAssinada}']`,
      digestAlgorithm: 'http://www.w3.org/2000/09/xmldsig#sha1',
      transforms: [
        'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
        'http://www.w3.org/TR/2001/REC-xml-c14n-20010315',
      ],
    })

    sig.computeSignature(xml)
    const signedXmlFull = sig.getSignedXml()

    const signatureXml = signedXmlFull.match(/<Signature[\s\S]*?<\/Signature>/)?.[0]
    if (!signatureXml) {
      throw new Error('Não foi possível extrair a tag <Signature> do XML assinado.');
    }

    const closingTag = `</${tagAssinada}>`;
    const insertAt = xml.indexOf(closingTag) + closingTag.length;

    const xmlWithSignature = xml.slice(0, insertAt) + signatureXml + xml.slice(insertAt);

    return xmlWithSignature;  
  }
}

