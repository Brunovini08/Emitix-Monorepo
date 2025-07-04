import { BadRequestException, Injectable } from "@nestjs/common";
import { XMLBuilder } from "fast-xml-parser";
import { IdLoteService } from "../../sefaz/services/idLote.service";
import { NfeEventoJsonInterface } from "src/core/nfe/domain/interfaces/nfe-evento/nfeEventoJson.inteface";

@Injectable()
export class NFeEventoBuilder {

  private readonly idLoteService: IdLoteService

  constructor(
    idLoteService: IdLoteService,
  ) {
    this.idLoteService = idLoteService
  }

  async envioEvento(
    data: NfeEventoJsonInterface,
    idUser: string,
    chaveAcesso: string,
  ): Promise<string> {
    if (!data) {
      throw new BadRequestException('Dados inválidos');
    }
    if (!idUser) {
      throw new BadRequestException('ID do usuário inválido');
    }
    if (!chaveAcesso) {
      throw new BadRequestException('ID de acesso inválido');
    }
    const dataJson = data ? JSON.parse(JSON.stringify(data)) : data;
    console.log(dataJson.versao)
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
    } = dataJson.infEvento;


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
        '@_versao': dataJson.versao,
        '@_xmlns': 'http://www.portalfiscal.inf.br/nfe',
        idLote,
        evento: {
          '@_versao': dataJson.versao,
          '@_xmlns': 'http://www.portalfiscal.inf.br/nfe',
          infEvento: {
            '@_Id': data.id,
            cOrgao,
            tpAmb,
            ...(CNPJ ? { CNPJ } : { CPF }),
            chNFe,
            dhEvento,
            tpEvento,
            nSeqEvento,
            verEvento,
            detEvento: {
              '@_versao': dataJson.versao,
              ...value,
            },
          },
        },
      },
    };

    const xml = parser.build(root);
    console.log({
      "XML": xml,
    })
    return xml;
  }
}