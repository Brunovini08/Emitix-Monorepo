import { BadRequestException, Injectable } from '@nestjs/common';
import { Base64 } from 'node-forge';
import { validateXmlXsd } from 'src/core/nfe/infrastructure/certificate/services/validateXmlXsd.util';
import { EmissionService } from '../../../emission/application/emission.service';
import { IdLoteService } from '../../infrastructure/external/sefaz/services/idLote.service';
import { TEnvConsCad } from '../../domain/types/complex_types/TCons/TEnvConsCad';
import TEnvConsSitNfe from '../../domain/types/complex_types/TCons/TEnvConsSitNfe';
import TEnvConsStatServ from '../../domain/types/complex_types/TCons/TEnvConsStatServ';
import { TEnviConsReciNFe } from '../../domain/types/complex_types/TCons/TEnviConsReciNFe';
import { TEnvDistDFeInt } from '../../domain/types/complex_types/TDist/TEnvDistDFeInt';
import { TEnvEvento } from '../../domain/types/complex_types/TEvento/TEnvEvento';
import TEnvInutNfe from '../../domain/types/complex_types/TInut/TEnvInutNfe';
import { NfeConsultaCadastroUseCase } from '../use-cases/nfe-consulta-cadastro.usecase';
import { NfeDanfeUseCase } from '../use-cases/nfe-danfe.usecase';
import { NfeEmitirUseCase } from '../use-cases/nfe-emitir.usecase';
import { NfeInutilizarUseCase } from '../use-cases/nfe-inutilizar.usecase';
import { NfeStatusUseCase } from '../use-cases/nfe-status.usecase';
import { NfeConsultaUseCase } from '../use-cases/nfe-consulta.usecase';
import { SignedXmlUtil } from '../../infrastructure/external/xml/sign/signedXml.util';
import { CertificateService } from '../../infrastructure/certificate/certificate.service';
import { NFeMapper } from '../../domain/mappers/nfe-emitir/nfe.mapper';
import { SendSefaz } from '../../infrastructure/external/sefaz/SendSefaz';
import { HttpService } from '@nestjs/axios';
import { NFeDto } from '../../domain/types/complex_types/TNFe/NFe.dto';
import { EnviNFeGen } from '../../infrastructure/external/sefaz/services/enviNFeGen.util';
import { firstValueFrom } from 'rxjs';
import { NfeConsultaProcessamentoUseCase } from '../use-cases/nfe-consulta-processamento.usecase';
import { ConsultaProcessamentoMapper } from '../../domain/mappers/nfe-consulta-processamento/nfe-consulta-processamento.mapper';
import { NfeInutilizarMapper } from '../../domain/mappers/nfe-inutilizar/nfe-inutilizar.mapper';
import { NfeConsultaMapper } from '../../domain/mappers/nfe-consulta/nfe-consulta.mapper';
import { NfeStatusMapper } from '../../domain/mappers/nfe-status/nfe-status.mapper';
import { NfeConsultaCadastroMapper } from '../../domain/mappers/nfe-consulta-cadastro/nfe-consulta-cadastro.mapper';
import { NfeDanfeMapper } from '../../domain/mappers/nfe-danfe/nfe-danfe.mapper';
import { EventoMapper } from '../../domain/mappers/nfe-evento/evento/evento.mapper';
import { NfeEventoUsecase } from '../use-cases/nfe-evento.usecase';
import { NfeEventoJsonInterface } from '../../domain/interfaces/nfe-evento/nfeEventoJson.inteface';
import { SignedEventXml } from '../../infrastructure/external/xml/sign/signedEventXML.util';

@Injectable()
export class NotaService {

  private readonly nfeEmitirUseCase: NfeEmitirUseCase
  private readonly nfeInutilizarUseCase: NfeInutilizarUseCase
  private readonly nfeConsultaProcessamento: NfeConsultaProcessamentoUseCase
  private readonly nfeConsultaUseCase: NfeConsultaUseCase
  private readonly nfeConsultaCadastroUseCase: NfeConsultaCadastroUseCase
  private readonly nfeStatusUseCase: NfeStatusUseCase
  private readonly nfeDanfeUseCase: NfeDanfeUseCase
  private readonly nfeEventoUseCase: NfeEventoUsecase

  private readonly emissionService: EmissionService

  private readonly certificateService: CertificateService

  private readonly signedXmlUtil: SignedXmlUtil
  private readonly signedXmlEventoUtil: SignedEventXml

  private readonly idLoteService: IdLoteService

  private readonly httpService: HttpService

  private readonly enviNFeGen: EnviNFeGen

  constructor(
    emissionService: EmissionService,
    nfeEmitirUseCase: NfeEmitirUseCase,
    nfeInutilizarUseCase: NfeInutilizarUseCase,
    nfeConsultaUseCase: NfeConsultaUseCase,
    nfeStatusUseCase: NfeStatusUseCase,
    nfeConsultaCadastroUseCase: NfeConsultaCadastroUseCase,
    nfeDanfeUseCase: NfeDanfeUseCase,
    nfeConsultaProcessamentoUseCase: NfeConsultaProcessamentoUseCase,
    certificateService: CertificateService,
    signedXmlUtil: SignedXmlUtil,
    idLoteService: IdLoteService,
    httpService: HttpService,
    enviNFeGen: EnviNFeGen,
    nfeEventoUseCase: NfeEventoUsecase,
    signedXmlEventoUtil: SignedEventXml,
  ) {
    this.emissionService = emissionService
    this.nfeEmitirUseCase = nfeEmitirUseCase
    this.nfeInutilizarUseCase = nfeInutilizarUseCase
    this.nfeConsultaUseCase = nfeConsultaUseCase
    this.nfeStatusUseCase = nfeStatusUseCase
    this.nfeConsultaCadastroUseCase = nfeConsultaCadastroUseCase
    this.nfeDanfeUseCase = nfeDanfeUseCase
    this.nfeConsultaProcessamento = nfeConsultaProcessamentoUseCase
    this.certificateService = certificateService
    this.signedXmlUtil = signedXmlUtil
    this.idLoteService = idLoteService
    this.httpService = httpService
    this.enviNFeGen = enviNFeGen
    this.nfeEventoUseCase = nfeEventoUseCase
    this.signedXmlEventoUtil = signedXmlEventoUtil
  }

  async emitir(
    createNfeDto: NFeDto,
    file: Base64,
    certPassword: string,
    userId: string,
    indSinc: string,
    nUrl: number,
    issuerInvoice: any,
    typeDocument: string,
  ) {
    try {
      const { cert, privateKey } = await this.certificateService.validateCertificate(file, certPassword)
      if (!cert || !privateKey) throw new BadRequestException('Certificado inválido')
      const cnpj = await this.certificateService.extractCnpjFromCertificate(file, certPassword)
      if (String(createNfeDto.NFe.infNFe.emit.CNPJ) !== cnpj) throw new BadRequestException('Cnpj do emitente não é igual ao do certificado')
      const nfe = NFeMapper.fromDto(createNfeDto)
      const nfeJson = nfe.toJSON()
      const xml = await this.nfeEmitirUseCase.execute(nfe)
      const sign = await this.signedXmlUtil.signXml(xml, file, certPassword, nfeJson.nfeChaveAcesso, 'infNFe')
      const result = await validateXmlXsd(sign, 0)

      if (result === true) {
        const idLote = await this.idLoteService.generateId(userId);
        if (!idLote) throw new BadRequestException('Id do Lote não vou gerado');
        const envNfe = await this.enviNFeGen.enviNFeGen(idLote, sign.toString(), indSinc)
        const envNfeValidate = await validateXmlXsd(envNfe, 8)
        if (envNfeValidate === true) {
          const sendSefaz = new SendSefaz(this.httpService)
          const response = await firstValueFrom(sendSefaz.sendSefazRequest(
            '/home/capita/emitix/apps/emitixAPI/src/config/etc/nginx/ssl/cadeia.pem',
            envNfe,
            String(createNfeDto.NFe.infNFe.ide.cUF),
            String(createNfeDto.NFe.infNFe.ide.tpAmb),
            nUrl,
            cert,
            privateKey,
            typeDocument
          ));

          return response
        }
        return envNfeValidate;
      } else {
        return {
          message: 'Erro de validação no XML',
          statusCode: 400,
          result
        };
      }
    } catch (error) {
      return {
        error: error.message,
        status: 400
      }
    }
  }

  async consultaProcessamento(
    body: TEnviConsReciNFe,
    file: Base64,
    certPassword: string,
    nUrl: number,
    typeDocument: string,
  ) {
    try {
      const { cert, privateKey } = await this.certificateService.validateCertificate(file, certPassword)
      if (!cert || !privateKey) throw new BadRequestException('Certificado inválido')
      const cnpj = await this.certificateService.extractCnpjFromCertificate(file, certPassword)
      if (String(body.cnpj) !== cnpj) throw new BadRequestException('Cnpj do emitente não é igual ao do certificado')
      const nfeConsultaProcessamento = ConsultaProcessamentoMapper.fromDto(body)
      const xml = await this.nfeConsultaProcessamento.execute(nfeConsultaProcessamento);
      const result = await validateXmlXsd(xml, 1);
      if (result === true) {
        const xmlString = String(xml);
        const sendSefaz = new SendSefaz(this.httpService)
        const envXml = await firstValueFrom(sendSefaz.sendSefazRequest(
          '/home/capita/emitix/apps/emitixAPI/src/config/etc/nginx/ssl/cadeia.pem',
          xmlString,
          String(body.uf),
          String(body.consReciNFe.tpAmb),
          nUrl,
          cert,
          privateKey,
          typeDocument,
        ));
        return envXml;
      } else {
        return {
          message: 'Erro de validação no XML',
          statusCode: 400,
          result
        };
      }
    } catch (error) {
      return {
        error: error.message,
        status: 400
      }
    }
  }

  async inutilizarNFe(
    body: TEnvInutNfe,
    file: Base64,
    certPassword: string,
    nUrl: number,
    typeDocument: string,
  ) {
    try {
      const { cert, privateKey } = await this.certificateService.validateCertificate(file, certPassword)
      if (!cert || !privateKey) throw new BadRequestException('Certificado inválido')
      const cnpj = await this.certificateService.extractCnpjFromCertificate(file, certPassword)
      if (String(body.inutNFe.infInut.CNPJ) !== cnpj) throw new BadRequestException('Cnpj do emitente não é igual ao do certificado')
      const inutNFe = NfeInutilizarMapper.fromDto(body.inutNFe.infInut);
      const inutNFeJson = inutNFe.toJSON()
      const xml = await this.nfeInutilizarUseCase.execute(inutNFeJson);
      const sign = await this.signedXmlUtil.signXml(xml, file, certPassword, inutNFeJson.nfeChaveAcesso, 'infInut');
      const result = await validateXmlXsd(sign, 2);
      if (result === true) {
        const idLote = await this.idLoteService.generateId(String(body.inutNFe.infInut.CNPJ));
        if (!idLote) throw new BadRequestException('Id do Lote não vou gerado');

        const sendSefaz = new SendSefaz(this.httpService)
        const response = await firstValueFrom(sendSefaz.sendSefazRequest(
          '/home/capita/emitix/apps/emitixAPI/src/config/etc/nginx/ssl/cadeia.pem',
          sign,
          String(inutNFe.cUF),
          String(inutNFe.tpAmb),
          nUrl,
          cert,
          privateKey,
          typeDocument,
        ))
        return response
      } else {
        return {
          message: 'Erro de validação no XML',
          statusCode: 400,
          result
        };
      }
    } catch (error) {
      return {
        error: error.message,
        status: 400
      }
    }
  }

  async consultaNFe(
    body: TEnvConsSitNfe,
    file: Base64,
    certPassword: string,
    nUrl: number,
    typeDocument: string,
  ) {
    try {
      const { cert, privateKey } = await this.certificateService.validateCertificate(file, certPassword)
      if (!cert || !privateKey) throw new BadRequestException('Certificado inválido')
      const cnpj = await this.certificateService.extractCnpjFromCertificate(file, certPassword)
      if (String(body.CNPJ) !== cnpj) throw new BadRequestException('Cnpj do emitente não é igual ao do certificado')
      const consultaNfe = NfeConsultaMapper.fromDto(body);
      const consultaNfeJson = consultaNfe.toJSON()
      const xml = await this.nfeConsultaUseCase.execute(consultaNfeJson.data, consultaNfeJson.versao);
      const result = await validateXmlXsd(xml, 3);
      if (result === true) {
        const sendSefaz = new SendSefaz(this.httpService)
        const envXml = await firstValueFrom(sendSefaz.sendSefazRequest(
          '/home/capita/emitix/apps/emitixAPI/src/config/etc/nginx/ssl/cadeia.pem',
          xml,
          String(body.consSitNFe.uf),
          String(body.consSitNFe.tpAmb),
          nUrl,
          cert,
          privateKey,
          typeDocument,
        ))
        return envXml;
      } else {
        return {
          message: 'Erro de validação no XML',
          statusCode: 400,
          result
        };
      }
    } catch (error) {
      return {
        error: error.message,
        status: 400
      }
    }
  }

  async statusServico(
    body: TEnvConsStatServ,
    file: Base64,
    certPassword: string,
    nUrl: number,
    typeDocument: string,
  ) {
    try {
      const { cert, privateKey } = await this.certificateService.validateCertificate(file, certPassword)
      if (!cert || !privateKey) throw new BadRequestException('Certificado inválido')
      const cnpj = await this.certificateService.extractCnpjFromCertificate(file, certPassword)
      if (String(body.CNPJ) !== cnpj) throw new BadRequestException('Cnpj do emitente não é igual ao do certificado')
      const statusNfe = NfeStatusMapper.fromDto(body);
      const statusNfeJson = statusNfe.toJSON()
      const xml = await this.nfeStatusUseCase.execute(statusNfeJson.data, statusNfeJson.versao);
      const result = await validateXmlXsd(xml, 4);
      if (result === true) {
        const sendSefaz = new SendSefaz(this.httpService)
        const envXml = await firstValueFrom(sendSefaz.sendSefazRequest(
          '/home/capita/emitix/apps/emitixAPI/src/config/etc/nginx/ssl/cadeia.pem',
          xml,
          String(body.consStatServ.cUF),
          String(body.consStatServ.tpAmb),
          nUrl,
          cert,
          privateKey,
          typeDocument,
        ))
        return envXml;
      } else {
        return {
          message: 'Erro de validação no XML',
          statusCode: 400,
          result
        };
      }
    } catch (error) {
      return {
        error: error.message,
        status: 400
      }
    }
  }

  async consultaCadastro(
    file: Base64,
    certPassword: any,
    body: TEnvConsCad,
    nUrl: number,
    typeDocument: string,
  ) {
    try {
      const { cert, privateKey } = await this.certificateService.validateCertificate(file, certPassword)
      if (!cert || !privateKey) throw new BadRequestException('Certificado inválido')
      const cnpj = await this.certificateService.extractCnpjFromCertificate(file, certPassword)
      if (String(String(body.ConsCad.infCons.CNPJ)) !== cnpj) throw new BadRequestException('Cnpj do emitente não é igual ao do certificado')
      const consultaCadastro = NfeConsultaCadastroMapper.fromDto(body);
      const consultaCadastroJson = consultaCadastro.toJSON()
      const xml = await this.nfeConsultaCadastroUseCase.execute(consultaCadastroJson, consultaCadastroJson.versao);
      const result = await validateXmlXsd(xml, 5);
      if (result === true) {
        const sendSefaz = new SendSefaz(this.httpService)
        const envXml = await firstValueFrom(sendSefaz.sendSefazRequest(
          '/home/capita/emitix/apps/emitixAPI/src/config/etc/nginx/ssl/cadeia.pem',
          xml,
          String(body.ConsCad.cUF),
          String(body.ConsCad.tpAmb),
          nUrl,
          cert,
          privateKey,
          typeDocument,
        ))
        return envXml;
      } else {
        return {
          message: 'Erro de validação no XML',
          statusCode: 400,
          result
        };
      }
    } catch (error) {
      return {
        error: error.message,
        status: 400
      }
    }
  }

  async distribuicaoDfe(
    file: Base64,
    certPassword: string,
    body: TEnvDistDFeInt,
    nUrl: number,
    typeDocument: string,
  ) {
    try {
      const { cert, privateKey } = await this.certificateService.validateCertificate(file, certPassword)
      if (!cert || !privateKey) throw new BadRequestException('Certificado inválido')
      const cnpj = await this.certificateService.extractCnpjFromCertificate(file, certPassword)
      if (String(body.distDFeInt.CNPJ) !== cnpj) throw new BadRequestException('Cnpj do emitente não é igual ao do certificado')
      const distribuicaoDfe = NfeDanfeMapper.fromDto(body);
      const distribuicaoDfeJson = distribuicaoDfe.toJSON()
      const xml = await this.nfeDanfeUseCase.execute(distribuicaoDfeJson.distDFeInt, distribuicaoDfeJson.versao);
      const result = await validateXmlXsd(xml, 6);
      if (result === true) {
        const sendSefaz = new SendSefaz(this.httpService)
        const envXml = await firstValueFrom(sendSefaz.sendSefazRequest(
          '/home/capita/emitix/apps/emitixAPI/src/config/etc/nginx/ssl/cadeia.pem',
          xml,
          String(body.uf),
          String(body.distDFeInt.tpAmb),
          nUrl,
          cert,
          privateKey,
          typeDocument,
        ))
        return envXml;
      } else {
        return {
          message: 'Erro de validação no XML',
          statusCode: 400,
          result
        };
      }

    } catch (error) {
      return {
        error: error.message,
        status: 400
      }
    }
  }

  async evento(
    certPassword: string,
    body: TEnvEvento,
    idUser: string,
    file: Base64,
    nUrl: number,
    typeDocument: string,
  ) {
    try {
      const { cert, privateKey } = await this.certificateService.validateCertificate(file, certPassword)
      if (!cert || !privateKey) throw new BadRequestException('Certificado inválido')
      const cnpj = await this.certificateService.extractCnpjFromCertificate(file, certPassword)
      if (String(body.envEvento.evento.infEvento.CNPJ) !== cnpj) throw new BadRequestException('Cnpj do emitente não é igual ao do certificado')
      const evento = EventoMapper.fromDto(body);
      const eventoJson = evento.toJSON() as NfeEventoJsonInterface
      const xml = await this.nfeEventoUseCase.execute(eventoJson, idUser, eventoJson.chaveAcesso);
      const sign = await this.signedXmlEventoUtil.signEvent(xml, file, certPassword, eventoJson.chaveAcesso, 'infEvento');
      console.log(sign)
      const result = await validateXmlXsd(sign, 7);
      if (result === true) {
        const sendSefaz = new SendSefaz(this.httpService)
        const envXml = await firstValueFrom(sendSefaz.sendSefazRequest(
          '/home/capita/emitix/apps/emitixAPI/src/config/etc/nginx/ssl/cadeia.pem',
          sign,
          String(body.envEvento.uf),
          String(body.envEvento.evento.infEvento.tpAmb),
          nUrl,
          cert,
          privateKey,
          typeDocument,
        ))
        return envXml;
      } else {
        return {
          message: 'Erro de validação no XML',
          statusCode: 400,
          result
        }
      }
    } catch (error) {
      return {
        error: error.message,
        status: 400
      }
    }
  }
}


