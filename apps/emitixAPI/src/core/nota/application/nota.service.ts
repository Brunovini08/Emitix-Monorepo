import { BadRequestException, Injectable } from '@nestjs/common';
import { Base64 } from 'node-forge';
import { PrismaService } from 'src/shared/common/prismaConfig/prisma.service';
import { sendSefazRequest } from 'src/shared/common/utils/common/buildSoapEnvelop.util';
import { logOperation } from 'src/shared/common/utils/common/logOperation.util';
import { signedEventXml } from 'src/shared/common/utils/common/signedEvent.util';
import { signedXml } from 'src/shared/common/utils/common/signedXml.util';
import { enviNFeGen } from 'src/shared/common/utils/generate/enviNFeGen.util';
import {
  generateAccessKeyToInutNfe,
  generateAccessKeyToEvent,
} from 'src/shared/common/utils/generate/generateAccessKey.util';
import { extractCNPJFromSubject } from 'src/shared/common/utils/validate/getCnpjFromCertificate.util';
import { validateCertificate } from 'src/shared/common/utils/validate/validateCertificate.util';
import { validateXmlXsd } from 'src/shared/common/utils/validate/validateXmlXsd.util';
import { convert } from 'xmlbuilder2';
import { EmissionService } from '../../emission/application/emission.service';
import { IdLoteService } from '../../nfe/application/services/idLote.service';
import { NFeBuilderService } from '../../nfe/application/services/nfe-builder.service';
import { TEnvConsCad } from '../../nfe/domain/types/complex_types/TCons/TEnvConsCad';
import TEnvConsSitNfe from '../../nfe/domain/types/complex_types/TCons/TEnvConsSitNfe';
import TEnvConsStatServ from '../../nfe/domain/types/complex_types/TCons/TEnvConsStatServ';
import { TEnviConsReciNFe } from '../../nfe/domain/types/complex_types/TCons/TEnviConsReciNFe';
import { TEnvDistDFeInt } from '../../nfe/domain/types/complex_types/TDist/TEnvDistDFeInt';
import { TEnvEvento } from '../../nfe/domain/types/complex_types/TEvento/TEnvEvento';
import TEnvInutNfe from '../../nfe/domain/types/complex_types/TInut/TEnvInutNfe';
import { NFeDto } from '../../nfe/domain/types/complex_types/TNFe/NFe.dto';

@Injectable()
export class NotaService {
  constructor(
    private readonly nfeBuildService: NFeBuilderService,
    private readonly prisma: PrismaService,
    private readonly idLoteService: IdLoteService,
    private readonly emissionService: EmissionService,
  ) {}

  async emitir(
    createNfeDto: NFeDto,
    file: Base64,
    certPassword: string,
    userId: string,
    indSinc: string,
    nUrl: number,
    issuerInvoice: any,
    typeDocument: string,
    cert: any,
    privateKey: any,
  ) {
    const valide = validateCertificate(cert);
    if (valide === 'Certificado ainda não é válido.')
      throw new BadRequestException('Certificado ainda não é válido.');
    else if (valide === 'Certificado expirado.')
      throw new BadRequestException('Certificado expirado.');
    else if (valide === 'Certificado é valido') {
      const validateCnpjFromCertificate = extractCNPJFromSubject(
        file,
        certPassword,
      );
      const cnpjEmit = createNfeDto.NFe?.infNFe?.emit?.CNPJ;
      if (String(cnpjEmit) !== validateCnpjFromCertificate)
        throw new BadRequestException(
          'Cnpj do emitente não é igual ao do certificado',
        );
      const cleanJson = (await this.nfeBuildService.cleanJson(
        createNfeDto,
      )) as Record<string, unknown>;

      const createXML = await this.nfeBuildService.postXml(cleanJson);

      const sign = signedXml(
        createXML.xml,
        file,
        certPassword,
        createXML.chave_acesso ??
          (() => {
            throw new BadRequestException('Chave de acesso não foi gerada');
          })(),
        'infNFe',
      );
      if (sign !== undefined) {
        const result = await validateXmlXsd(sign, 0);
        if (result === true) {
          const user = await this.prisma.user.findUnique({
            where: {
              id: userId,
            },
          });
          if (!user) throw new BadRequestException('Id do usuário é inválido');

          const idLote = await this.idLoteService.generateId(user.id);
          if (!idLote)
            throw new BadRequestException('Id do Lote não vou gerado');

          const xmlSend = await enviNFeGen(idLote, indSinc, sign || '');
          const envNfe = await sendSefazRequest(
            xmlSend,
            String(createNfeDto.NFe.infNFe.ide.cUF),
            String(createNfeDto.NFe.infNFe.ide.tpAmb),
            nUrl,
            cert,
            privateKey,
            typeDocument,
          );
          const data = convert(envNfe.data, { format: 'object' });
          const returnData = JSON.parse(JSON.stringify(data));
          const result =
            returnData['soap:Envelope']['soap:Body'].nfeResultMsg.retEnviNFe
              .protNFe.infProt;
          const { cStat, xMotivo } = result;
          if (cStat === 100) {
            const emissionRegister = await this.emissionService.create({
              chaveAcesso:
                createXML.chave_acesso ??
                (() => {
                  throw new BadRequestException(
                    'Chave de acesso não foi gerada',
                  );
                })(),
              xml: xmlSend,
              status: 'Emitido',
              issueId: issuerInvoice.id,
              emissionType: 'NFCR',
              uf: String(createNfeDto.NFe.infNFe.ide.cUF),
              valor: Number(createNfeDto.NFe.infNFe.total.ICMSTot.vNF),
              numeroDocumento: String(createNfeDto.NFe.infNFe.ide.nNF),
              dataEmissao: new Date(String(createNfeDto.NFe.infNFe.ide.dhEmi)),
              pdf: '',
            });

            if (!emissionRegister)
              throw new BadRequestException('Erro ao registrar emissão');
            logOperation(
              createNfeDto.NFe.infNFe.emit.CNPJ,
              userId,
              'Emissão de NFCe',
              `NFCe ${createNfeDto.NFe.infNFe.ide.nNF} emitida com sucesso`,
            );
            return envNfe?.data;
          } else {
            const emissionRegister = await this.emissionService.create({
              chaveAcesso:
                createXML.chave_acesso ??
                (() => {
                  throw new BadRequestException(
                    'Chave de acesso não foi gerada',
                  );
                })(),
              xml: xmlSend,
              status: `${cStat}`,
              issueId: issuerInvoice.id,
              emissionType: 'NFCE',
              uf: String(createNfeDto.NFe.infNFe.ide.cUF),
              valor: Number(createNfeDto.NFe.infNFe.total.ICMSTot.vNF),
              numeroDocumento: String(createNfeDto.NFe.infNFe.ide.nNF),
              dataEmissao: new Date(String(createNfeDto.NFe.infNFe.ide.dhEmi)),
              pdf: '',
            });
            logOperation(
              createNfeDto.NFe.infNFe.emit.CNPJ,
              userId,
              'Emissão de NFCe',
              `NFCe ${createNfeDto.NFe.infNFe.ide.nNF} emitida com erro: ${cStat} - ${xMotivo}`,
            );
            return envNfe?.data;
          }
        } else {
          console.error(`Erros de validação`, result);
        }
      }
    }
  }

  async consultaProcessamento(
    cert: any,
    privateKey: any,
    body: TEnviConsReciNFe,
    nUrl: number,
    typeDocument: string,
  ) {
    const valide = validateCertificate(cert);
    if (valide === 'Certificado ainda não é válido.')
      throw new BadRequestException('Certificado ainda não é válido.');
    else if (valide === 'Certificado expirado.')
      throw new BadRequestException('Certificado expirado.');
    else if (valide === 'Certificado é valido') {
      const xml = await this.nfeBuildService.consultaProcessamentoXml(body);
      const result = await validateXmlXsd(xml, 1);
      if (result === true) {
        const xmlString = String(xml);
        const envXml = await sendSefazRequest(
          xmlString,
          String(body.consReciNFe.uf),
          body.consReciNFe.tpAmb,
          nUrl,
          cert,
          privateKey,
          typeDocument,
        );
        return envXml?.data;
      } else {
        console.error(`Erros de validação`, result);
      }
    }
  }

  async inutilizarNFe(
    body: TEnvInutNfe,
    file: Base64,
    certPassword: string,
    nUrl: number,
    typeDocument: string,
    cert: any,
    privateKey: any,
  ) {
    const valide = validateCertificate(cert);
    if (valide === 'Certificado ainda não é válido.')
      throw new BadRequestException('Certificado ainda não é válido.');
    else if (valide === 'Certificado expirado.')
      throw new BadRequestException('Certificado expirado.');
    else if (valide === 'Certificado é valido') {
      const data = body.inutNFe.infInut;
      const accessKey = generateAccessKeyToInutNfe(
        data?.cUF,
        data?.CNPJ,
        data?.ano,
        data?.mod,
        data?.serie,
        data?.nNFIni,
        data?.nNFFin,
      );
      const xml = await this.nfeBuildService.inutilizarNFeXml(body, accessKey);
      const signed = signedXml(xml, file, certPassword, accessKey, 'infInut');
      const xmlString = String(signed);
      const result = await validateXmlXsd(xmlString, 2);
      if (result === true) {
        const envXml = await sendSefazRequest(
          signed,
          String(body.inutNFe.infInut.cUF),
          String(body.inutNFe.infInut.tpAmb),
          nUrl,
          cert,
          privateKey,
          typeDocument,
        );
        return envXml.data;
      }
      return result;
    }
  }

  async consultaNFe(
    body: TEnvConsSitNfe,
    cert: any,
    privateKey: any,
    nUrl: number,
    typeDocument: string,
  ) {
    const valide = validateCertificate(cert);
    if (valide === 'Certificado ainda não é válido.')
      throw new BadRequestException('Certificado ainda não é válido.');
    else if (valide === 'Certificado expirado.')
      throw new BadRequestException('Certificado expirado.');
    else if (valide === 'Certificado é valido') {
      const xml = await this.nfeBuildService.consultaNFe(body);
      const xmlString = String(xml);
      const result = await validateXmlXsd(xmlString, 3);
      if (result === true) {
        const envXml = await sendSefazRequest(
          xml,
          String(body.consSitNFe.uf),
          String(body.consSitNFe.tpAmb),
          nUrl,
          cert,
          privateKey,
          typeDocument,
        );
        return envXml.data;
      }
      return result;
    }
  }

  async statusServico(
    body: TEnvConsStatServ,
    cert: any,
    privateKey: any,
    nUrl: number,
    typeDocument: string,
  ) {
    const xml = await this.nfeBuildService.statusServico(body);
    const xmlString = String(xml);
    const result = await validateXmlXsd(xmlString, 4);
    if (result === true) {
      const envXml = await sendSefazRequest(
        xml,
        String(body.consStatServ.cUF),
        String(body.consStatServ.tpAmb),
        nUrl,
        cert,
        privateKey,
        typeDocument,
      );
      return envXml.data;
    }
    return result;
  }

  async consultaCadastro(
    cert: any,
    privateKey: any,
    body: TEnvConsCad,
    nUrl: number,
    typeDocument: string,
  ) {
    const valide = validateCertificate(cert);
    if (valide === 'Certificado ainda não é válido.')
      throw new BadRequestException('Certificado ainda não é válido.');
    else if (valide === 'Certificado expirado.')
      throw new BadRequestException('Certificado expirado.');
    else if (valide === 'Certificado é valido') {
      const xml = await this.nfeBuildService.consultaCadastro(body);
      const xmlString = String(xml);
      const result = await validateXmlXsd(xmlString, 5);
      if (result === true) {
        const envXml = await sendSefazRequest(
          xml,
          String(body.ConsCad.cUF),
          String(body.ConsCad.tpAmb),
          nUrl,
          cert,
          privateKey,
          typeDocument,
        );
        return envXml.data;
      }
      return result;
    }
  }

  async distribuicaoDfe(
    cert: any,
    privateKey: any,
    body: TEnvDistDFeInt,
    nUrl: number,
    typeDocument: string,
  ) {
    const valide = validateCertificate(cert);
    if (valide === 'Certificado ainda não é válido.')
      throw new BadRequestException('Certificado ainda não é válido.');
    else if (valide === 'Certificado expirado.')
      throw new BadRequestException('Certificado expirado.');
    else if (valide === 'Certificado é valido') {
      const xml = await this.nfeBuildService.distribuicaoDfe(body);
      const xmlString = String(xml);
      const result = await validateXmlXsd(xmlString, 6);
      console.log(result);
      if (result === true) {
        const envXml = await sendSefazRequest(
          xml,
          'AN',
          String(body.distDFeInt.tpAmb),
          nUrl,
          cert,
          privateKey,
          typeDocument,
        );
        return envXml.data;
      }
      return result;
    }
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
    const valide = validateCertificate(cert);
    if (valide === 'Certificado ainda não é válido.')
      throw new BadRequestException('Certificado ainda não é válido.');
    else if (valide === 'Certificado expirado.')
      throw new BadRequestException('Certificado expirado.');
    else if (valide === 'Certificado é valido') {
      const { chNFe, tpEvento, nSeqEvento } = body.envEvento.evento.infEvento;
      const accessIDToEvent = generateAccessKeyToEvent(
        tpEvento,
        chNFe,
        nSeqEvento,
      );
      const xml = await this.nfeBuildService.envioEvento(
        body,
        idUser,
        accessIDToEvent,
      );
      const signed = signedEventXml(
        xml,
        file,
        certPassword,
        accessIDToEvent,
        'infEvento',
      );
      const xmlString = String(signed);
      const result = await validateXmlXsd(xmlString, 7);
      if (result === true) {
        const envXml = await sendSefazRequest(
          signed,
          String(body.envEvento.uf),
          String(body.envEvento.evento.infEvento.tpAmb),
          nUrl,
          cert,
          privateKey,
          typeDocument,
        );
        return envXml.data;
      }
      return result;
    }
  }
}
