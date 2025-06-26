import axios from "axios";
import { ResolveSefazUrl } from "./resolveSefazUrl.util";
import { HttpServiceSend } from "src/core/nfe/infrastructure/http/http.service";
import { BuildSoapEnvelop } from "./buildSoapEnvelop.util";
import * as forge from 'node-forge';
import { Injectable } from "@nestjs/common";

@Injectable()
export class SendSefazRequest {
  async sendSefazRequest(
    xml: string,
    uf: string,
    tpAmb: string,
    service: number,
    certificate: forge.pki.Certificate,
    privateKey: forge.pki.PrivateKey,
    typeDocument: string
  ) {
    const caPath: string = '/home/capita/emitix/apps/emitixAPI/src/config/etc/nginx/ssl/cadeia.pem'
    const { url, urlName } = await ResolveSefazUrl.resolveSefazUrl(uf, tpAmb, service, typeDocument);
    const httpsAgent = HttpServiceSend.createHttpsAgent(certificate, privateKey, caPath);
    const soapEnvelope = BuildSoapEnvelop.buildSoapEnvelope(xml, urlName);
    const headers = {
      'Content-Type': 'application/soap+xml;charset=UTF-8'
    };
  
    try {
      const response = await axios.post(url, soapEnvelope, {
        headers,
        httpsAgent
      });
      console.log(response)
      return response;
    } catch (error) {
      console.error('Erro ao enviar requisição para a SEFAZ:', error);
      throw error;
    }
  }
}