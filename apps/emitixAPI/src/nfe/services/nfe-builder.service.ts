import { BadRequestException, Injectable } from '@nestjs/common';
import { cleanObject } from '../reusable/utils/clean/cleanObject.util';
import {
  ExpandObject,
  XMLBuilderCreateOptions,
} from 'xmlbuilder2/lib/interfaces';
import { create } from 'xmlbuilder2';
import { generateCNF } from '../reusable/utils/generate/generate-cNfe.util';
import { generateAccessKey, generateAccessKeyToEvent } from '../reusable/utils/generate/generateAccessKey.util';
import type { NFeDto } from '../reusable/types/complex_types/TNFe/NFe.dto';
import type { TEnviConsReciNFe } from '../reusable/types/complex_types/TCons/TEnviConsReciNFe';
import type TEnvInutNfe from '../reusable/types/complex_types/TInut/TEnvInutNfe';
import type TEnvConsSitNfe from '../reusable/types/complex_types/TCons/TEnvConsSitNfe';
import type TEnvConsStatServ from '../reusable/types/complex_types/TCons/TEnvConsStatServ';
import type { TEnvConsCad } from '../reusable/types/complex_types/TCons/TEnvConsCad';
import type { TEnvDistDFeInt } from '../reusable/types/complex_types/TDist/TEnvDistDFeInt';
import type { TEnvEvento } from '../reusable/types/complex_types/TEvento/TEnvEvento';
import { IdLoteService } from './idLote.service';
import { XMLBuilder, XMLParser } from 'fast-xml-parser';


@Injectable()
export class NFeBuilderService {
  private _idLoteService: IdLoteService;
  constructor(
    idLoteService: IdLoteService
  ) {
    this._idLoteService = idLoteService;
  }

  async cleanJson(nfJson: NFeDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const clean = await cleanObject(nfJson);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return clean;
  }

  async postXml(
    data: XMLBuilderCreateOptions | string | ExpandObject
  ) {
    const dataJson: NFeDto = typeof data === 'string' ? JSON.parse(data) : data;

    const cNF = generateCNF();

    const root = create(data);

    const { cDV, chave } = generateAccessKey(
      dataJson?.NFe?.infNFe?.ide?.cUF,
      dataJson?.NFe?.infNFe?.emit?.CNPJ,
      dataJson?.NFe?.infNFe?.ide?.mod,
      dataJson?.NFe?.infNFe?.ide?.serie,
      dataJson?.NFe?.infNFe?.ide?.nNF,
      cNF,
      dataJson?.NFe?.infNFe?.ide?.tpEmis,
      dataJson?.NFe?.infNFe?.ide?.dhEmi
    );

    const NFe = root.find((node) => node.node.nodeName === 'NFe');
    NFe?.att('xmlns', 'http://www.portalfiscal.inf.br/nfe');

    const infNfe = NFe?.find((node) => node.node.nodeName === 'infNFe');
    infNfe?.att('Id', `NFe${chave}`);
    infNfe?.att('versao', '4.00');

    const ide = infNfe?.find((node) => node.node.nodeName === 'ide');
    const cnf = ide?.find((node) => node.node.nodeName === 'cNF');
    if (ide) {
      if (!cnf) {
        const cNFTag = ide.ele('cNF').txt(cNF);
        const tag = Array.from(ide.node.childNodes).filter(
          (n) => n?.nodeType === 1,
        );
        if (tag.length >= 1) {
          ide.node.insertBefore(cNFTag.node, tag[1] ?? null);
        } else {
          ide.node.appendChild(cNFTag.node);
        }
      }

      const detElements = infNfe?.find((node) => node.node.nodeName === 'det')
        ? infNfe.find((node) => node.node.nodeName === 'det')
        : [];

      if (Array.isArray(detElements)) {
        detElements.forEach((detNode, index) => {
          (detNode as any).att('nItem', (index + 1).toString());
        });
      } else {
        detElements?.att('nItem', '1');
      }

      const tpEmisTag = ide.find((node) => node.node.nodeName === 'tpEmis');
      const cDVTag = ide.ele('cDV').txt(cDV);
      if (tpEmisTag) {
        const siblings = Array.from(ide.node.childNodes).filter(
          (n) => n?.nodeType === 1,
        );
        const tpEmisIndex = siblings.findIndex((n) => n?.nodeName === 'tpEmis');
        if (tpEmisIndex !== -1) {
          const nextNode = siblings[tpEmisIndex + 1] ?? null;
          ide.node.insertBefore(cDVTag.node, nextNode);
        } else {
          ide.node.appendChild(cDVTag.node);
        }
      } else {
        ide.node.appendChild(cDVTag.node);
      }

      const xml = root.end({ prettyPrint: false, headless: true });
      return {
        xml: xml,
        chave_acesso: chave,
      };
    } else {
      throw new Error('ide não existe');
    }
  }

  async consultaProcessamentoXml(
    data: XMLBuilderCreateOptions | string | ExpandObject) {
    const dataJson: TEnviConsReciNFe = data ? JSON.parse(JSON.stringify(data)) : data;
    const bodyXml = {
      tpAmb: dataJson.consReciNFe.tpAmb,
      nRec: dataJson.consReciNFe.nRec,
    }
    const root = create({ consReciNFe: bodyXml })
    const consReciNFe = root.root()
    consReciNFe.att('xmlns', 'http://www.portalfiscal.inf.br/nfe');
    consReciNFe.att('versao', dataJson.consReciNFe.versao)
    const xml = root.end({ prettyPrint: false, headless: true });
    return xml
  }

  async inutilizarNFeXml(
    data: XMLBuilderCreateOptions | string | ExpandObject, accessKey: string) {
    const dataJson: TEnvInutNfe = data ? JSON.parse(JSON.stringify(data)) : data;
    const { versao, CNPJ, ano, cUF, mod, nNFFin, nNFIni, serie, tpAmb, xJust, xServ } = dataJson.inutNFe.infInut
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
        xJust
      }
    }
    const root = create({ inutNFe: objectFormat })
    const inutNFe = root.root()
    const infInut = inutNFe.find((node) => node.node.nodeName === 'infInut')
    infInut?.att('Id', accessKey)
    inutNFe.att('xmlns', 'http://www.portalfiscal.inf.br/nfe')
    inutNFe.att('versao', versao)
    const xml = root.end({ prettyPrint: false, headless: true });
    return xml
  }

  async consultaNFe(
    data: XMLBuilderCreateOptions | string | ExpandObject
  ): Promise<string> {
    const dataJson: TEnvConsSitNfe = data ? JSON.parse(JSON.stringify(data)) : data;
    const { chNFe, tpAmb, versao, xServ, uf } = dataJson.consSitNFe
    const dataFormat = {
      tpAmb,
      xServ,
      chNFe
    }
    const root = create({ consSitNFe: dataFormat });
    const consSitNFe = root.root();
    consSitNFe.att('xmlns', 'http://www.portalfiscal.inf.br/nfe');
    consSitNFe.att('versao', versao);
    return root.end({ prettyPrint: false, headless: true });
  }

  statusServico(data: XMLBuilderCreateOptions | string | ExpandObject): Promise<string> {
    const dataJson: TEnvConsStatServ = data ? JSON.parse(JSON.stringify(data)) : data;
    const { cUF, tpAmb, versao, xServ } = dataJson.consStatServ
    const dataFormat = {
      tpAmb,
      cUF,
      xServ,
    }
    const root = create({ consStatServ: dataFormat })
    const consStatServ = root.root()
    consStatServ.att('xmlns', 'http://www.portalfiscal.inf.br/nfe')
    consStatServ.att('versao', versao)
    return Promise.resolve(root.end({ prettyPrint: false, headless: true }))
  }

  async consultaCadastro(data: XMLBuilderCreateOptions | string | ExpandObject): Promise<string> {
    const dataJson: TEnvConsCad = data ? JSON.parse(JSON.stringify(data)) : data;
    const { infCons } = dataJson.ConsCad
    const dataFormat = {
      infCons: infCons
    }
    const root = create({ ConsCad: dataFormat })
    const ConsCad = root.root()
    ConsCad.att('xmlns', 'http://www.portalfiscal.inf.br/nfe');
    ConsCad.att('versao', String(dataJson.ConsCad.versao))
    return Promise.resolve(root.end({ prettyPrint: false, headless: true }))
  }

  async distribuicaoDfe(data: XMLBuilderCreateOptions | string | ExpandObject): Promise<string> {
    const dataJson: TEnvDistDFeInt = data ? JSON.parse(JSON.stringify(data)) : data;
    const { cUFAutor, tpAmb, versao, CNPJ, CPF, consChNFe, distNSU, ultNSU } = dataJson.distDFeInt
    const dataFormat = {
      tpAmb,
      cUFAutor,
      ...(CNPJ ? { CNPJ } : { CPF }),
      ...(consChNFe ? { consChNFe } : distNSU ? { distNSU } : { ultNSU }),
    }

    const root = create({ distDFeInt: dataFormat })
    const distDFeInt = root.root()
    distDFeInt.att('xmlns', 'http://www.portalfiscal.inf.br/nfe')
    distDFeInt.att('versao', String(versao))
    return Promise.resolve(root.end({ prettyPrint: false, headless: true }))
  }

  async envioEvento(data: XMLBuilderCreateOptions | string | ExpandObject, idUser: string, accessIDToEvent: string): Promise<string> {
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
    const { CNPJ, CPF, cOrgao, tpAmb, chNFe, dhEvento, tpEvento, verEvento, detEvento, nSeqEvento } = dataJson.envEvento.evento.infEvento

    const idLote = await this._idLoteService.generateIdEvent(idUser)

    const parser = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: '@_'
    })

    const value = JSON.stringify(detEvento).includes('TAtorInteressado') ? detEvento.TAtorInteressado :
      JSON.stringify(detEvento).includes('TCancelamento') ? detEvento.TCancelamento :
        JSON.stringify(detEvento).includes('TCarta_Correcao') ? detEvento.TCarta_Correcao :
          JSON.stringify(detEvento).includes('TEpec') ? detEvento.TEpec :
            JSON.stringify(detEvento).includes('TMani_Dest') ? detEvento.TMani_Dest :
              JSON.stringify(detEvento).includes('TPedido_Prorrog') ? detEvento.TPedido_Prorrog : null


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
              ...value
            }
          }
        }
      }
    }

    const xml = parser.build(root)
    return xml
  }
}
