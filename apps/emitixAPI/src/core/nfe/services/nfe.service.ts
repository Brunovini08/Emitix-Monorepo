import { BadRequestException, Injectable } from '@nestjs/common';
import { loadCertificate } from 'src/resources/common/utils/validate/processCertificate.util';
import type { Base64 } from 'node-forge';
import type { NFeDto } from '../reusable/types/complex_types/TNFe/NFe.dto';
import { TEnviConsReciNFe } from '../reusable/types/complex_types/TCons/TEnviConsReciNFe';
import TEnvInutNfe from '../reusable/types/complex_types/TInut/TEnvInutNfe';
import TEnvConsSitNfe from '../reusable/types/complex_types/TCons/TEnvConsSitNfe';
import TEnvConsStatServ from '../reusable/types/complex_types/TCons/TEnvConsStatServ';
import { TEnvConsCad } from '../reusable/types/complex_types/TCons/TEnvConsCad';
import { TEnvDistDFeInt } from '../reusable/types/complex_types/TDist/TEnvDistDFeInt';
import type { TEnvEvento } from '../reusable/types/complex_types/TEvento/TEnvEvento';
import type { NotaService } from 'src/resources/middlewares/nota/nota.service';

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