import * as forge from 'node-forge';

export function extractCNPJFromSubject(
  pfxBase64: string,
  password: string,
): string | undefined {
  const p12Der = forge.util.decode64(pfxBase64);
  const p12Asn1 = forge.asn1.fromDer(p12Der);
  const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, password);
  try {
    for (const safeContents of p12.safeContents) {
      for (const safeBag of safeContents.safeBags) {
        if (safeBag.cert) {
          const subjectAttrs = safeBag.cert.subject.attributes;
          const cn = subjectAttrs.find((attr) => attr.shortName === 'CN');
          const match =
            cn && typeof cn.value === 'string'
              ? cn.value.match(/\d{14}/)
              : null; // Procura um CNPJ com 14 dígitos
          if (match) {
            return match[0];
          }
          throw new Error('CNPJ não encontrado no certificado');
        }
      }
    }
  } catch (error) {
    throw new Error(error);
  }
}
