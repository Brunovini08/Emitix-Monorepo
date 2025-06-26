import type { HttpService } from "@nestjs/axios";
import { HttpServiceSend } from "../http/http.service";
import { ResolveSefazUrl } from "./services/resolveSefazUrl.util";
import { BuildSoapEnvelop } from "./services/buildSoapEnvelop.util";
import * as forge from 'node-forge';
import { from, map, switchMap } from 'rxjs';

export class SendSefaz {
  constructor(
    private readonly httpService: HttpService,
  ) {
    this.httpService = httpService
  }

  sendSefazRequest(
    caPath: string,
    xml: string,
    uf: string,
    tpAmb: string,
    service: number,
    certificate: forge.pki.Certificate,
    privateKey: forge.pki.PrivateKey,
    typeDocument: string
  ) {
    return from(ResolveSefazUrl.resolveSefazUrl(uf, tpAmb, service, typeDocument)).pipe(
      switchMap(({ url, urlName }) => {
        const httpsAgent = HttpServiceSend.createHttpsAgent(certificate, privateKey, caPath);
        const soapEnvelope = BuildSoapEnvelop.buildSoapEnvelope(xml, urlName);
        
        const headers = {
          'Content-Type': 'application/soap+xml;charset=UTF-8'
        };

        try {
          const response = this.httpService.post(url, soapEnvelope, {
            headers,
            httpsAgent
          });
          return response.pipe(
            map((response) => response.data)
          );
        } catch (error) {
          console.error('Erro ao enviar requisição para a SEFAZ:', error);
          throw error;
        }
      })
    );
  }
}