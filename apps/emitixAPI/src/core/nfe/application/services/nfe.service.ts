import { BadRequestException, Injectable } from '@nestjs/common';
import  { Base64 } from 'node-forge';
import  { NotaService } from 'src/core/nota/application/nota.service';
import  { loadCertificate } from 'src/shared/common/utils/validate/processCertificate.util';
import  { TEnvConsCad } from '../../domain/types/complex_types/TCons/TEnvConsCad';
import  TEnvConsSitNfe from '../../domain/types/complex_types/TCons/TEnvConsSitNfe';
import  TEnvConsStatServ from '../../domain/types/complex_types/TCons/TEnvConsStatServ';
import  { TEnviConsReciNFe } from '../../domain/types/complex_types/TCons/TEnviConsReciNFe';
import  { TEnvDistDFeInt } from '../../domain/types/complex_types/TDist/TEnvDistDFeInt';
import  { TEnvEvento } from '../../domain/types/complex_types/TEvento/TEnvEvento';
import  TEnvInutNfe from '../../domain/types/complex_types/TInut/TEnvInutNfe';
import  { NFeDto } from '../../domain/types/complex_types/TNFe/NFe.dto';

@Injectable()
export class NfeService {

  constructor(
    private notaService: NotaService
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
      const { cert, privateKey } = loadCertificate(file, certPassword);
      if (!cert || !privateKey)
        throw new BadRequestException('Certificado inválido');
      else {
        return this.notaService.emitir(
          createNfeDto,
          file,
          certPassword,
          userId,
          indSinc,
          nUrl,
          issuerInvoice,
          typeDocument,
          cert,
          privateKey
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async consultaProcessamento(body: TEnviConsReciNFe, file: Base64,
    certPassword: string, nUrl, typeDocument: string) {
    const { cert, privateKey } = loadCertificate(file, certPassword);
    if (!cert || !privateKey)
      throw new BadRequestException('Certificado inválido');
    else {
      return this.notaService.consultaProcessamento(
        cert,
        privateKey,
        body,
        nUrl,
        typeDocument
      )
    }
  }

  async inutilizarNFe(body: TEnvInutNfe, file: Base64, certPassword: string, nUrl: number, typeDocument: string) {
    const { cert, privateKey } = loadCertificate(file, certPassword)
    if (!cert || !privateKey) throw new BadRequestException('Certificado inválido')
    else {
      return this.notaService.inutilizarNFe(
        body, file, certPassword, nUrl, typeDocument, cert, privateKey
      )
    }
  }

  async consultaNFe(body: TEnvConsSitNfe, file: Base64, certPassword: string, nUrl: number, typeDocument: string) {
    const { cert, privateKey } = loadCertificate(file, certPassword)
    if (!cert || !privateKey) throw new BadRequestException('Certificado inválido')
    else {
      return this.notaService.consultaNFe(
        body,
        cert,
        privateKey,
        nUrl,
        typeDocument
      )
    }
  }

  async statusServico(body: TEnvConsStatServ, certificate: string, password: string, nUrl: number, typeDocument: string) {
    const { cert, privateKey } = loadCertificate(certificate, password)
    if (!cert || !privateKey) throw new BadRequestException('Certificado inválido')
    else {
      return this.notaService.statusServico(
        body,
        cert,
        privateKey,
        nUrl,
        typeDocument)
    }
  }

  async consultaCadastro(body: TEnvConsCad, file: Base64, certPassword: string, nUrl: number, typeDocument: string) {
    const { cert, privateKey } = loadCertificate(file, certPassword)
    if (!cert || !privateKey) throw new BadRequestException('Certificado inválido')
    else {
      return this.notaService.consultaCadastro(
        cert,
        privateKey,
        body,
        nUrl,
        typeDocument
      )
    }
  }

  async distribuicaoDfe(body: TEnvDistDFeInt, file: Base64, certPassword: string, nUrl: number, typeDocument: string) {
    const { cert, privateKey } = loadCertificate(file, certPassword)
    if (!cert || !privateKey) throw new BadRequestException('Certificado inválido')
    else {
      return this.notaService.distribuicaoDfe(
        cert,
        privateKey,
        body,
        nUrl,
        typeDocument
      )
    }
  }

  async evento(body: TEnvEvento, file: Base64, certPassword: string, nUrl: number, idUser: string, typeDocument: string) {
    const { cert, privateKey } = loadCertificate(file, certPassword)
    if (!cert || !privateKey) throw new BadRequestException('Certificado inválido')
    else {
      return this.notaService.evento(
        cert,
        privateKey,
        body,
        idUser,
        file,
        certPassword,
        nUrl,
        typeDocument
      )
    }
  }
}