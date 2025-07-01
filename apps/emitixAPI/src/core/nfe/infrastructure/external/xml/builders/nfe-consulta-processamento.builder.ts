import { XMLBuilder } from "fast-xml-parser";
import type { TEnviConsReciNFe } from "src/core/nfe/domain/types/complex_types/TCons/TEnviConsReciNFe";

export class NfeConsultaProcessamentoBuilder {
  async consultaProcessamento(data: TEnviConsReciNFe, versao) {
    const parser = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    })

    const dataFormat = {
      tpAmb: data.consReciNFe.tpAmb,
      nRec: data.consReciNFe.nRec,
    }

    const xmlData = {
      consReciNFe: {
        '@_xmlns': 'http://www.portalfiscal.inf.br/nfe',
        '@_versao': versao,
        ...dataFormat
      }
    }

    return parser.build(xmlData)
  }
}