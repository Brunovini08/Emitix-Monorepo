import { Injectable } from "@nestjs/common";
import { XMLBuilder } from "fast-xml-parser";
import { NfeStatusJsonInterface } from "src/core/nfe/domain/interfaces/nfe-status/nfe-status-json.interface";

@Injectable()
export class NFeStatusBuilder {
  async statusServico(
    dataFormat: NfeStatusJsonInterface,
    versao: string
  ) {
    const parser = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    const objectFormat = {
      tpAmb: dataFormat.consStatServ.tpAmb,
      cUF: dataFormat.consStatServ.cUF,
      xServ: dataFormat.consStatServ.xServ,
    }

    const xmlData = {
      consStatServ: {
        '@_xmlns': 'http://www.portalfiscal.inf.br/nfe',
        '@_versao': versao,
        ...objectFormat
      }
    };

    return Promise.resolve(parser.build(xmlData));
  } 
}