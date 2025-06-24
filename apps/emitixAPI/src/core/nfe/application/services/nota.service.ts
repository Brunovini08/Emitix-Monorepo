import { BadRequestException, Injectable } from '@nestjs/common';
import { Base64 } from 'node-forge';
import { validateXmlXsd } from 'src/core/nfe/infrastructure/certificate/services/validateXmlXsd.util';
import { EmissionService } from '../../../emission/application/emission.service';
import { IdLoteService } from '../../infrastructure/sefaz/services/idLote.service';
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
import { SignedXmlUtil } from '../../infrastructure/xml/sign/signedXml.util';
import { CertificateService } from '../../infrastructure/certificate/certificate.service';
import { NFeMapper } from '../../domain/mappers/nfe.mapper';
import { SendSefaz } from '../../infrastructure/sefaz/SendSefaz';
import { HttpService } from '@nestjs/axios';
import * as forge from 'node-forge';
import { NFeDto } from '../../domain/types/complex_types/TNFe/NFe.dto';

@Injectable()
export class NotaService {

  private readonly nfeEmitirUseCase: NfeEmitirUseCase
  private readonly nfeInutilizarUseCase: NfeInutilizarUseCase
  private readonly nfeConsultaUseCase: NfeConsultaUseCase
  private readonly nfeStatusUseCase: NfeStatusUseCase
  private readonly nfeConsultaCadastroUseCase: NfeConsultaCadastroUseCase
  private readonly nfeDanfeUseCase: NfeDanfeUseCase

  private readonly emissionService: EmissionService
  private readonly certificateService: CertificateService
  private readonly signedXmlUtil: SignedXmlUtil
  private readonly idLoteService: IdLoteService
  private readonly httpService: HttpService
  constructor(
    emissionService: EmissionService,
    nfeEmitirUseCase: NfeEmitirUseCase,
    nfeInutilizarUseCase: NfeInutilizarUseCase,
    nfeConsultaUseCase: NfeConsultaUseCase,
    nfeStatusUseCase: NfeStatusUseCase,
    nfeConsultaCadastroUseCase: NfeConsultaCadastroUseCase,
    nfeDanfeUseCase: NfeDanfeUseCase,
    certificateService: CertificateService,
    signedXmlUtil: SignedXmlUtil,
    idLoteService: IdLoteService,
    httpService: HttpService,
  ) {
    this.emissionService = emissionService
    this.nfeEmitirUseCase = nfeEmitirUseCase
    this.nfeInutilizarUseCase = nfeInutilizarUseCase
    this.nfeConsultaUseCase = nfeConsultaUseCase
    this.nfeStatusUseCase = nfeStatusUseCase
    this.nfeConsultaCadastroUseCase = nfeConsultaCadastroUseCase
    this.nfeDanfeUseCase = nfeDanfeUseCase
    this.certificateService = certificateService
    this.signedXmlUtil = signedXmlUtil
    this.idLoteService = idLoteService
    this.httpService = httpService
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
        if (!idLote)
          throw new BadRequestException('Id do Lote não vou gerado');
        const sendSefaz = new SendSefaz(this.httpService)
        const envNfe = await sendSefaz.sendSefazRequest(
          '/home/capita/emitix/apps/emitixAPI/src/config/etc/nginx/ssl/cadeia.pem',
          sign,
          String(createNfeDto.NFe.infNFe.ide.cUF),
          String(createNfeDto.NFe.infNFe.ide.tpAmb),
          nUrl,
          cert,
          privateKey,
          certPassword,
          typeDocument,
        );
      }
    } catch (error) {
      console.error(error)
    }
  }

  async consultaProcessamento(
    body: TEnviConsReciNFe,
    file: Base64,
    cnpj: string,
    certPassword: string,
    nUrl: number,
    typeDocument: string,
) {

  // const valide = validateCertificate(cert);
  // if (valide === 'Certificado ainda não é válido.')
  //   throw new BadRequestException('Certificado ainda não é válido.');
  // else if (valide === 'Certificado expirado.')
  //   throw new BadRequestException('Certificado expirado.');
  // else if (valide === 'Certificado é valido') {
  //   const xml = await this.nfeBuildService.consultaProcessamentoXml(body);
  //   const result = await validateXmlXsd(xml, 1);
  //   if (result === true) {
  //     const xmlString = String(xml);
  //     const envXml = await sendSefazRequest(
  //       xmlString,
  //       String(body.consReciNFe.uf),
  //       body.consReciNFe.tpAmb,
  //       nUrl,
  //       cert,
  //       privateKey,
  //       typeDocument,
  //     );
  //     return envXml?.data;
  //   } else {
  //     console.error(`Erros de validação`, result);
  //   }
  // }
}

  async inutilizarNFe(
  body: TEnvInutNfe,
  file: Base64,
  certPassword: string,
  nUrl: number,
  typeDocument: string,
) {
  // const valide = validateCertificate(cert);
  // if (valide === 'Certificado ainda não é válido.')
  //   throw new BadRequestException('Certificado ainda não é válido.');
  // else if (valide === 'Certificado expirado.')
  //   throw new BadRequestException('Certificado expirado.');
  // else if (valide === 'Certificado é valido') {
  //   const data = body.inutNFe.infInut;
  //   const accessKey = generateAccessKeyToInutNfe(
  //     data?.cUF,
  //     data?.CNPJ,
  //     data?.ano,
  //     data?.mod,
  //     data?.serie,
  //     data?.nNFIni,
  //     data?.nNFFin,
  //   );
  //   const xml = await this.nfeBuildService.inutilizarNFeXml(body, accessKey);
  //   const signed = signedXml(xml, file, certPassword, accessKey, 'infInut');
  //   const xmlString = String(signed);
  //   const result = await validateXmlXsd(xmlString, 2);
  //   if (result === true) {
  //     const envXml = await sendSefazRequest(
  //       signed,
  //       String(body.inutNFe.infInut.cUF),
  //       String(body.inutNFe.infInut.tpAmb),
  //       nUrl,
  //       cert,
  //       privateKey,
  //       typeDocument,
  //     );
  //     return envXml.data;
  //   }
  //   return result;
  // }
}

  async consultaNFe(
  body: TEnvConsSitNfe,
  cert: any,
  privateKey: any,
  nUrl: number,
  typeDocument: string,
) {
  // const valide = validateCertificate(cert);
  // if (valide === 'Certificado ainda não é válido.')
  //   throw new BadRequestException('Certificado ainda não é válido.');
  // else if (valide === 'Certificado expirado.')
  //   throw new BadRequestException('Certificado expirado.');
  // else if (valide === 'Certificado é valido') {
  //   const xml = await this.nfeBuildService.consultaNFe(body);
  //   const xmlString = String(xml);
  //   const result = await validateXmlXsd(xmlString, 3);
  //   if (result === true) {
  //     const envXml = await sendSefazRequest(
  //       xml,
  //       String(body.consSitNFe.uf),
  //       String(body.consSitNFe.tpAmb),
  //       nUrl,
  //       cert,
  //       privateKey,
  //       typeDocument,
  //     );
  //     return envXml.data;
  //   }
  //   return result;
  // }
}

  async statusServico(
  body: TEnvConsStatServ,
  cert: any,
  privateKey: any,
  nUrl: number,
  typeDocument: string,
) {
  // const xml = await this.nfeBuildService.statusServico(body);
  // const xmlString = String(xml);
  // const result = await validateXmlXsd(xmlString, 4);
  // if (result === true) {
  //   const envXml = await sendSefazRequest(
  //     xml,
  //     String(body.consStatServ.cUF),
  //     String(body.consStatServ.tpAmb),
  //     nUrl,
  //     cert,
  //     privateKey,
  //     typeDocument,
  //   );
  //   return envXml.data;
  // }
  // return result;
}

  async consultaCadastro(
  cert: any,
  privateKey: any,
  body: TEnvConsCad,
  nUrl: number,
  typeDocument: string,
) {
  // const valide = validateCertificate(cert);
  // if (valide === 'Certificado ainda não é válido.')
  //   throw new BadRequestException('Certificado ainda não é válido.');
  // else if (valide === 'Certificado expirado.')
  //   throw new BadRequestException('Certificado expirado.');
  // else if (valide === 'Certificado é valido') {
  //   const xml = await this.nfeBuildService.consultaCadastro(body);
  //   const xmlString = String(xml);
  //   const result = await validateXmlXsd(xmlString, 5);
  //   if (result === true) {
  //     const envXml = await sendSefazRequest(
  //       xml,
  //       String(body.ConsCad.cUF),
  //       String(body.ConsCad.tpAmb),
  //       nUrl,
  //       cert,
  //       privateKey,
  //       typeDocument,
  //     );
  //     return envXml.data;
  //   }
  //   return result;
  // }
}

  async distribuicaoDfe(
  cert: any,
  privateKey: any,
  body: TEnvDistDFeInt,
  nUrl: number,
  typeDocument: string,
) {
  // const valide = validateCertificate(cert);
  // if (valide === 'Certificado ainda não é válido.')
  //   throw new BadRequestException('Certificado ainda não é válido.');
  // else if (valide === 'Certificado expirado.')
  //   throw new BadRequestException('Certificado expirado.');
  // else if (valide === 'Certificado é valido') {
  //   const xml = await this.nfeBuildService.distribuicaoDfe(body);
  //   const xmlString = String(xml);
  //   const result = await validateXmlXsd(xmlString, 6);
  //   console.log(result);
  //   if (result === true) {
  //     const envXml = await sendSefazRequest(
  //       xml,
  //       'AN',
  //       String(body.distDFeInt.tpAmb),
  //       nUrl,
  //       cert,
  //       privateKey,
  //       typeDocument,
  //     );
  //     return envXml.data;
  //   }
  //   return result;
  // }
}

  async evento(
  cert: any,
  privateKey: any,
  body: TEnvEvento,
  idUser: string,
  file: Base64,
  certPassword: string,
  nUrl: number,
  typeDocument: string,
) {
  // const valide = validateCertificate(cert);
  // if (valide === 'Certificado ainda não é válido.')
  //   throw new BadRequestException('Certificado ainda não é válido.');
  // else if (valide === 'Certificado expirado.')
  //   throw new BadRequestException('Certificado expirado.');
  // else if (valide === 'Certificado é valido') {
  //   const { chNFe, tpEvento, nSeqEvento } = body.envEvento.evento.infEvento;
  //   const accessIDToEvent = generateAccessKeyToEvent(
  //     tpEvento,
  //     chNFe,
  //     nSeqEvento,
  //   );
  //   const xml = await this.nfeBuildService.envioEvento(
  //     body,
  //     idUser,
  //     accessIDToEvent,
  //   );
  //   const signed = signedEventXml(
  //     xml,
  //     file,
  //     certPassword,
  //     accessIDToEvent,
  //     'infEvento',
  //   );
  //   const xmlString = String(signed);
  //   const result = await validateXmlXsd(xmlString, 7);
  //   if (result === true) {
  //     const envXml = await sendSefazRequest(
  //       signed,
  //       String(body.envEvento.uf),
  //       String(body.envEvento.evento.infEvento.tpAmb),
  //       nUrl,
  //       cert,
  //       privateKey,
  //       typeDocument,
  //     );
  //     return envXml.data;
  //   }
  //   return result;
  // }
}
}
