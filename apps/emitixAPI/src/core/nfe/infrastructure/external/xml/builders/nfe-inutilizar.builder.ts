import { XMLBuilder } from "fast-xml-parser"
import { Injectable } from "@nestjs/common";
import type { InutNFe } from "src/core/nfe/domain/entities/nfe-inutilizar.entity";

@Injectable()
export class NFeInutilizarBuilder {
  async inutilizarNFeXml(
    accessKey: string,
    objectFormat: InutNFe,
    versao: string
  ) {
    const parser = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    const xmlData = {
      inutNFe: {
        '@_xmlns': 'http://www.portalfiscal.inf.br/nfe',
        '@_versao': versao,
        infInut: {
          '@_Id': accessKey,
          ...objectFormat
        }
      }
    };

    const xml = parser.build(xmlData);
    return xml;
  }
}