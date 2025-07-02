import type { HttpService } from "@nestjs/axios";
import { HttpServiceSend } from "../http/http.service";
import { ResolveSefazUrl } from "./services/resolveSefazUrl.util";
import { BuildSoapEnvelop } from "./services/buildSoapEnvelop.util";
import * as forge from 'node-forge';
import { catchError, from, map, switchMap } from 'rxjs';

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
      console.log('URL da SEFAZ:', url);
      const httpsAgent = HttpServiceSend.createHttpsAgent(certificate, privateKey, caPath);
      const soapEnvelope = BuildSoapEnvelop.buildSoapEnvelope(xml, urlName);
      
      const headers = {
        'Content-Type': 'application/soap+xml;charset=UTF-8'
      };

      return this.httpService.post(url, soapEnvelope, {
        headers,
        httpsAgent
      }).pipe(
        map((response) => response.data),
        catchError((error) => {
          // Aqui você pode formatar ou registrar o erro
          console.error('Erro ao enviar requisição para a SEFAZ:', error.message || error);

          // Rejeita com uma mensagem personalizada ou erro completo
          throw new Error(
            `Erro ao comunicar com SEFAZ (${urlName}): ${error?.message || 'Erro desconhecido'}`
          );
        })
      );
    }),
    catchError((error) => {
      // Trata erros de URL ou de construção do envelope
      console.error('Erro antes de enviar a requisição:', error.message || error);
      throw error;
    })
  );
}
}