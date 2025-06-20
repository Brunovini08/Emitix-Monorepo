import { Injectable, BadRequestException } from '@nestjs/common';
import { create } from 'xmlbuilder2';
import { XMLBuilder } from 'fast-xml-parser';
import { cleanObject } from 'src/shared/common/utils/clean/cleanObject.util';
import { generateCNF } from 'src/shared/common/utils/generate/generate-cNfe.util';
import { generateAccessKey } from 'src/shared/common/utils/generate/generateAccessKey.util';
import { BuildService } from 'src/shared/middlewares/build/build.service';
import {
  XMLBuilderCreateOptions,
  ExpandObject,
} from 'xmlbuilder2/lib/interfaces';
import { TEnvConsCad } from '../../domain/types/complex_types/TCons/TEnvConsCad';
import TEnvConsSitNfe from '../../domain/types/complex_types/TCons/TEnvConsSitNfe';
import TEnvConsStatServ from '../../domain/types/complex_types/TCons/TEnvConsStatServ';
import { TEnviConsReciNFe } from '../../domain/types/complex_types/TCons/TEnviConsReciNFe';
import { TEnvDistDFeInt } from '../../domain/types/complex_types/TDist/TEnvDistDFeInt';
import { TEnvEvento } from '../../domain/types/complex_types/TEvento/TEnvEvento';
import TEnvInutNfe from '../../domain/types/complex_types/TInut/TEnvInutNfe';
import { NFeDto } from '../../domain/types/complex_types/TNFe/NFe.dto';
import { IdLoteService } from './idLote.service';

@Injectable()
export class NFeBuilderService implements INFeSerializer{
  constructor(
    public idLoteService: IdLoteService,
    public buildService: BuildService,
  ) {}

  async cleanJson(nfJson: NFeDto) {
    const clean = await cleanObject(nfJson);
    return clean;
  }

  async postXml(data: XMLBuilderCreateOptions | string | ExpandObject) {
    const dataJson: NFeDto = typeof data === 'string' ? JSON.parse(data) : data;

    const cNF = generateCNF();

    const { cDV, chave } = generateAccessKey(
      dataJson?.NFe?.infNFe?.ide?.cUF,
      dataJson?.NFe?.infNFe?.emit?.CNPJ,
      dataJson?.NFe?.infNFe?.ide?.mod,
      dataJson?.NFe?.infNFe?.ide?.serie,
      dataJson?.NFe?.infNFe?.ide?.nNF,
      cNF,
      dataJson?.NFe?.infNFe?.ide?.tpEmis,
      dataJson?.NFe?.infNFe?.ide?.dhEmi,
    );

    return this.buildService.buildXML(dataJson, cNF, cDV, chave);
  }

  async consultaProcessamentoXml(
    data: XMLBuilderCreateOptions | string | ExpandObject,
  ) {
    const dataJson: TEnviConsReciNFe = data
      ? JSON.parse(JSON.stringify(data))
      : data;
    const bodyXml = {
      tpAmb: dataJson.consReciNFe.tpAmb,
      nRec: dataJson.consReciNFe.nRec,
    };
    const root = create({ consReciNFe: bodyXml });
    const consReciNFe = root.root();
    consReciNFe.att('xmlns', 'http://www.portalfiscal.inf.br/nfe');
    consReciNFe.att('versao', dataJson.consReciNFe.versao);
    const xml = root.end({ prettyPrint: false, headless: true });
    return xml;
  }

  async inutilizarNFeXml(
    data: XMLBuilderCreateOptions | string | ExpandObject,
    accessKey: string,
  ) {
    const dataJson: TEnvInutNfe = data
      ? JSON.parse(JSON.stringify(data))
      : data;

    const {
      versao,
      CNPJ,
      ano,
      cUF,
      mod,
      nNFFin,
      nNFIni,
      serie,
      tpAmb,
      xJust,
      xServ,
    } = dataJson.inutNFe.infInut;

    const objectFormat = {
      infInut: {
        tpAmb,
        xServ,
        cUF,
        ano,
        CNPJ,
        mod,
        serie,
        nNFIni,
        nNFFin,
        xJust,
      },
    };

    return this.buildService.inutilizarNFeXml(accessKey, objectFormat, versao);
  }

  async consultaNFe(
    data: XMLBuilderCreateOptions | string | ExpandObject,
  ): Promise<string> {
    const dataJson: TEnvConsSitNfe = data
      ? JSON.parse(JSON.stringify(data))
      : data;
    const { chNFe, tpAmb, versao, xServ, uf } = dataJson.consSitNFe;
    const dataFormat = {
      tpAmb,
      xServ,
      chNFe,
    };
    return this.buildService.consultaNFe(dataFormat, versao);
  }

  statusServico(
    data: XMLBuilderCreateOptions | string | ExpandObject,
  ): Promise<string> {
    const dataJson: TEnvConsStatServ = data
      ? JSON.parse(JSON.stringify(data))
      : data;
    const { cUF, tpAmb, versao, xServ } = dataJson.consStatServ;
    const dataFormat = {
      tpAmb,
      cUF,
      xServ,
    };
    return this.buildService.statusServico(dataFormat, versao);
  }

  async consultaCadastro(
    data: XMLBuilderCreateOptions | string | ExpandObject,
  ): Promise<string> {
    const dataJson: TEnvConsCad = data
      ? JSON.parse(JSON.stringify(data))
      : data;
    const { infCons } = dataJson.ConsCad;
    const dataFormat = {
      infCons: infCons,
    };
    const versao = String(dataJson.ConsCad.versao);
    return this.buildService.consultaCadastro(dataFormat, versao);
  }

  async distribuicaoDfe(
    data: XMLBuilderCreateOptions | string | ExpandObject,
  ): Promise<string> {
    const dataJson: TEnvDistDFeInt = data
      ? JSON.parse(JSON.stringify(data))
      : data;
    const { cUFAutor, tpAmb, versao, CNPJ, CPF, consChNFe, distNSU, ultNSU } =
      dataJson.distDFeInt;
    const dataFormat = {
      tpAmb,
      cUFAutor,
      ...(CNPJ ? { CNPJ } : { CPF }),
      ...(consChNFe ? { consChNFe } : distNSU ? { distNSU } : { ultNSU }),
    };

    return this.buildService.distribuicaoDfe(dataFormat, String(versao));
  }

  async envioEvento(
    data: XMLBuilderCreateOptions | string | ExpandObject,
    idUser: string,
    accessIDToEvent: string,
  ): Promise<string> {
    if (!data) {
      throw new BadRequestException('Dados inválidos');
    }
    if (!idUser) {
      throw new BadRequestException('ID do usuário inválido');
    }
    if (!accessIDToEvent) {
      throw new BadRequestException('ID de acesso inválido');
    }
    const dataJson: TEnvEvento = data ? JSON.parse(JSON.stringify(data)) : data;
    const {
      CNPJ,
      CPF,
      cOrgao,
      tpAmb,
      chNFe,
      dhEvento,
      tpEvento,
      verEvento,
      detEvento,
      nSeqEvento,
    } = dataJson.envEvento.evento.infEvento;

    const idLote = await this.idLoteService.generateIdEvent(idUser);

    const parser = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    const value = JSON.stringify(detEvento).includes('TAtorInteressado')
      ? detEvento.TAtorInteressado
      : JSON.stringify(detEvento).includes('TCancelamento')
        ? detEvento.TCancelamento
        : JSON.stringify(detEvento).includes('TCarta_Correcao')
          ? detEvento.TCarta_Correcao
          : JSON.stringify(detEvento).includes('TEpec')
            ? detEvento.TEpec
            : JSON.stringify(detEvento).includes('TMani_Dest')
              ? detEvento.TMani_Dest
              : JSON.stringify(detEvento).includes('TPedido_Prorrog')
                ? detEvento.TPedido_Prorrog
                : null;

    const root = {
      envEvento: {
        '@_versao': dataJson.envEvento.versao,
        '@_xmlns': 'http://www.portalfiscal.inf.br/nfe',
        idLote,
        evento: {
          '@_versao': dataJson.envEvento.versao,
          '@_xmlns': 'http://www.portalfiscal.inf.br/nfe',
          infEvento: {
            '@_Id': accessIDToEvent,
            cOrgao,
            tpAmb,
            ...(CNPJ ? { CNPJ } : { CPF }),
            chNFe,
            dhEvento,
            tpEvento,
            nSeqEvento,
            verEvento,
            detEvento: {
              '@_versao': dataJson.envEvento.versao,
              ...value,
            },
          },
        },
      },
    };

    const xml = parser.build(root);
    return xml;
  }
}
