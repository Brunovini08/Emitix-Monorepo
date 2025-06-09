import * as fs from 'fs'
import * as https from 'https';
import * as forge from 'node-forge';
import axios from 'axios';
import { SEFAZ_CONFIG } from 'src/shared/config/sefaz.config';

function resolveSefazUrl(uf: string, tpAmb: string, service: number, typeDocument: string): { url: string, urlName: string } {
  const urls = SEFAZ_CONFIG[uf][typeDocument][tpAmb];
  const url = Object.values(urls)[service];
  const urlName = Object.keys(urls)[service];

  if (!url) {
    throw new Error(`URL not found for UF=${uf}, Ambiente=${tpAmb}, Serviço=${service}`);
  }

  return { url: url as string, urlName };
}

function createHttpsAgent(cert: forge.pki.Certificate, privateKey: forge.pki.PrivateKey, caPath: string): https.Agent {
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

function buildSoapEnvelope(xml: string, urlName: string): string {
  const danfe = `<?xml version="1.0" encoding="utf-8"?>
  <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                   xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                   xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">  
    <soap12:Body> 
     <nfeDistDFeInteresse xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe">
      <nfeDadosMsg xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/${urlName}">
        ${xml}
      </nfeDadosMsg> 
    </nfeDistDFeInteresse>
    </soap12:Body> 
  </soap12:Envelope>`

  const normal_req = `<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                     xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                     xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">  
      <soap12:Body> 
        <nfeDadosMsg xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/${urlName}">
          ${xml}
        </nfeDadosMsg> 
      </soap12:Body> 
    </soap12:Envelope>`

  return urlName === 'NFeDistribuicaoDFe' ? danfe : normal_req
}

export async function sendSefazRequest(
  xml: string,
  uf: string,
  tpAmb: string,
  service: number,
  certificate: forge.pki.Certificate,
  privateKey: forge.pki.PrivateKey,
  typeDocument: string
) {
   const caPath: string = '/home/capita/emitix/apps/emitixAPI/src/config/etc/nginx/ssl/cadeia.pem'
  const { url, urlName } = resolveSefazUrl(uf, tpAmb, service, typeDocument);
  const httpsAgent = createHttpsAgent(certificate, privateKey, caPath);
  const soapEnvelope = buildSoapEnvelope(xml, urlName);
  console.log(soapEnvelope)
  const headers = {
    'Content-Type': 'application/soap+xml;charset=UTF-8'
  };

  try {
    const response = await axios.post(url, soapEnvelope, {
      headers,
      httpsAgent
    });
    return response;
  } catch (error) {
    console.error('Erro ao enviar requisição para a SEFAZ:', error);
    throw error;
  }
}
