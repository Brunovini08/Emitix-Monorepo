import { BadRequestException, Injectable } from "@nestjs/common";
import { XMLBuilder } from "fast-xml-parser";
import type { TEnvEvento } from "src/core/nfe/domain/types/complex_types/TEvento/TEnvEvento";
import type { ExpandObject, XMLBuilderCreateOptions } from "xmlbuilder2/lib/interfaces";
import type { IdLoteService } from "../../sefaz/services/idLote.service";

@Injectable()
export class NFeEventoBuilder {

  private readonly idLoteService: IdLoteService

  constructor(
    idLoteService: IdLoteService,
  ) {
    this.idLoteService = idLoteService
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