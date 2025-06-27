import { pki, type Base64 } from 'node-forge';
import { SignedXml } from 'xml-crypto';
import { CertificateService } from '../../../certificate/certificate.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignedXmlUtil {
  constructor(private readonly certificateService: CertificateService) {}

  async signXml(xml: string, pfxBuffer: Base64, pass: string, chave_acesso: string, aboveTag: string) {
    const {cert, privateKey} = await this.certificateService.validateCertificate(pfxBuffer, pass)
    if (!cert || !cert) {
      throw new Error('Certificado não encontrado')
    }
    const certPem = pki.certificateToPem(cert)
    const sig = new SignedXml({
      privateKey: pki.privateKeyToPem(privateKey),
      signatureAlgorithm: 'http://www.w3.org/2000/09/xmldsig#rsa-sha1',
      canonicalizationAlgorithm: 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315',
      publicCert: certPem,
      implicitTransforms: ['http://www.w3.org/TR/2001/REC-xml-c14n-20010315'],
    })

    sig.addReference({
      uri: `#NFe${chave_acesso}`,
      xpath: `//*[local-name(.)='${aboveTag}']`,
      digestAlgorithm: 'http://www.w3.org/2000/09/xmldsig#sha1',
      transforms: [
        'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
        'http://www.w3.org/TR/2001/REC-xml-c14n-20010315',
      ],
    })

    sig.signatureAlgorithm = 'http://www.w3.org/2000/09/xmldsig#rsa-sha1';
    sig.computeSignature(xml);

    const signedXmlResult = sig.getSignedXml();
    return signedXmlResult
  }
}
