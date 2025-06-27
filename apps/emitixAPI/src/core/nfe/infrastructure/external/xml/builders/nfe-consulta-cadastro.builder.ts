import { Injectable } from "@nestjs/common";
import { XMLBuilder } from "fast-xml-parser";

@Injectable()
export class NFeConsultaCadastroBuilder {
  async consultaCadastro(
    dataFormat: any,
    versao: string
  ) {
    const parser = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    const xmlData = {
      ConsCad: {
        '@_xmlns': 'http://www.portalfiscal.inf.br/nfe',
        '@_versao': versao,
        ...dataFormat
      }
    };

    return Promise.resolve(parser.build(xmlData));
  } 
}