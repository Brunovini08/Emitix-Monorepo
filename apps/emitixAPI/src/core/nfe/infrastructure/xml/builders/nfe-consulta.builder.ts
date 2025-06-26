import { Injectable } from "@nestjs/common";
import { XMLBuilder } from "fast-xml-parser";

@Injectable()
export class NFeConsultaBuilder {
  async consultaNFe(
    dataFormat: any,
    versao: string
  ) {
    const parser = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    const xmlData = {
      consSitNFe: {
        '@_xmlns': 'http://www.portalfiscal.inf.br/nfe',
        '@_versao': versao,
        ...dataFormat
      }
    };

    return parser.build(xmlData);
  } 
}