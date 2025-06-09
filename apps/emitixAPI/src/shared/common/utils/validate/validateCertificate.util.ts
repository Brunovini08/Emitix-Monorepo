import { X509Certificate } from 'crypto';
import { pki } from 'node-forge';
// Suponha que 'certBase64' seja a string Base64 do certificado recebido
export function validateCertificate(certFile) {
  const pem = pki.certificateToPem(certFile);
  const cert = new X509Certificate(pem);
  const now = new Date();
  const validFrom = new Date(cert.validFrom);
  const validTo = new Date(cert.validTo);

  if (now < validFrom) {
    return 'Certificado ainda não é válido.';
  } else if (now > validTo) {
    return 'Certificado expirado.';
  } else {
    return 'Certificado é valido';
  }
}
