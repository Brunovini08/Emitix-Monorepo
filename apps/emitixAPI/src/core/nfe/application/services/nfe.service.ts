import { BadRequestException, Injectable } from '@nestjs/common';
import  { Base64 } from 'node-forge';
import  { NotaService } from 'src/core/nfe/application/services/nota.service';
import  { TEnvConsCad } from '../../domain/types/complex_types/TCons/TEnvConsCad';
import  TEnvConsSitNfe from '../../domain/types/complex_types/TCons/TEnvConsSitNfe';
import  TEnvConsStatServ from '../../domain/types/complex_types/TCons/TEnvConsStatServ';
import  { TEnviConsReciNFe } from '../../domain/types/complex_types/TCons/TEnviConsReciNFe';
import  { TEnvDistDFeInt } from '../../domain/types/complex_types/TDist/TEnvDistDFeInt';
import  { TEnvEvento } from '../../domain/types/complex_types/TEvento/TEnvEvento';
import  TEnvInutNfe from '../../domain/types/complex_types/TInut/TEnvInutNfe';
import type { NFeDto } from '../../domain/types/complex_types/TNFe/NFe.dto';

@Injectable()
export class NfeService {

  constructor(
    private notaService: NotaService,
  ) { }

  async create(
    createNfeDto: NFeDto,
    file: Base64,
    certPassword: string,
    userId: string,
    indSinc: string,
    nUrl: number,
    issuerInvoice: any,
    typeDocument: string
  ) {
    try {
        return this.notaService.emitir(
          createNfeDto,
          file,
          certPassword,
          userId,
          indSinc,
          nUrl,
          issuerInvoice,
          typeDocument,
        );
    } catch (error) {
      console.error(error);
    }
  }

  async consultaProcessamento(body: TEnviConsReciNFe, file: Base64,
    certPassword: string, nUrl: number, typeDocument: string) {
      return this.notaService.consultaProcessamento(
        body,
        file,
        certPassword,
        nUrl,
        typeDocument
      )
  }

  async inutilizarNFe(body: TEnvInutNfe, file: Base64, certPassword: string, nUrl: number, typeDocument: string) {
    return this.notaService.inutilizarNFe(
      body, file, certPassword, nUrl, typeDocument
    )
  }

  async consultaNFe(body: TEnvConsSitNfe, file: Base64, certPassword: string, nUrl: number, typeDocument: string) {
    return this.notaService.consultaNFe(
      body,
      file,
      certPassword,
      nUrl,
      typeDocument
    )
  }

  async statusServico(body: TEnvConsStatServ, certificate: string, password: string, nUrl: number, typeDocument: string) {
    return this.notaService.statusServico(
      body,
      certificate,
      password,
      nUrl,
      typeDocument
    )
  }

  async consultaCadastro(body: TEnvConsCad, file: Base64, certPassword: string, nUrl: number, typeDocument: string) {
    return this.notaService.consultaCadastro(
      file,
      certPassword,
      body,
      nUrl,
      typeDocument
    )
  }

  async distribuicaoDfe(body: TEnvDistDFeInt, file: Base64, certPassword: string, nUrl: number, typeDocument: string) {
    return this.notaService.distribuicaoDfe(
      file,
      certPassword,
      body,
      nUrl,
      typeDocument
    )
  }

  async evento(body: TEnvEvento, file: Base64, certPassword: string, nUrl: number, idUser: string, typeDocument: string) {
    return this.notaService.evento(
      file,
      certPassword,
      body,
      idUser,
      file,
      certPassword,
      nUrl,
      typeDocument
    )
  }
}