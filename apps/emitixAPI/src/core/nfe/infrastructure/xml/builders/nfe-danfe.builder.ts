import { Injectable } from "@nestjs/common";
import { XMLBuilder } from "fast-xml-parser";

@Injectable()
export class NFeDanfeBuilder {
  async distribuicaoDfe(
    dataFormat: any,
    versao: string
  ) {
    const parser = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    const xmlData = {
      distDFeInt: {
        '@_xmlns': 'http://www.portalfiscal.inf.br/nfe',
        '@_versao': String(versao),
        ...dataFormat
      }
    };

    return Promise.resolve(parser.build(xmlData));
  } 
}