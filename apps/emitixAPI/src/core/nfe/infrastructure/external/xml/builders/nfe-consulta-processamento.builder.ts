import { XMLBuilder } from "fast-xml-parser";
import type { ConsultaProcessamentoNfeEntity } from "src/core/nfe/domain/entities/nfe-consulta-processamento.entity";

export class NfeConsultaProcessamentoBuilder {
  async consultaProcessamento(data: ConsultaProcessamentoNfeEntity, versao) {

    const nfe = data.toJSON().consReciNFe

    const parser = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    })

    const xmlData = {
      consReciNFe: {
        '@_xmlns': 'http://www.portalfiscal.inf.br/nfe',
        '@_versao': versao,
        ...nfe
      }
    }

    return parser.build(xmlData)
  }
}