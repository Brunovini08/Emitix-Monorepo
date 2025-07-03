import { Injectable } from "@nestjs/common";
import { XMLBuilder } from "fast-xml-parser";
import { NfeDanfeJsonInterface } from "src/core/nfe/domain/interfaces/nfe-danfe/nfeDanfeJson.interface";

@Injectable()
export class NFeDanfeBuilder {
  async distribuicaoDfe(
    dataFormat: NfeDanfeJsonInterface,
    versao: string
  ) {
    const parser = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    const xmlData = {
      distDFeInt: {
        '@_xmlns': 'http://www.portalfiscal.inf.br/nfe',
        '@_versao': versao,
        ...dataFormat
      }
    };

    return Promise.resolve(parser.build(xmlData));
  } 
}