import * as fs from 'fs'
import * as https from 'https';
import * as forge from 'node-forge';

export class HttpServiceSend {
  static createHttpsAgent(cert: forge.pki.Certificate, privateKey: forge.pki.PrivateKey, caPath: string): https.Agent {
    const certPem = forge.pki.certificateToPem(cert);
    const keyPem = forge.pki.privateKeyToPem(privateKey);
    const ca = fs.readFileSync(caPath);
  
    return new https.Agent({
      cert: certPem,
      key: keyPem,
      ca,
      rejectUnauthorized: true,
    });
  }
}