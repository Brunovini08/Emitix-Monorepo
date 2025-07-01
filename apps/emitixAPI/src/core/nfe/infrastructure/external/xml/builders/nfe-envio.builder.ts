import { XMLBuilder } from "fast-xml-parser";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NFeEnvioBuilder {

  async buildXML(
    data: any,
    chave: string,
  ) {
    const parser = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      suppressBooleanAttributes: false,
      suppressEmptyNode: false,
    });

    // Adicionar atributos necessários ao XML
    const xmlData = {
      NFe: {
        '@_xmlns': 'http://www.portalfiscal.inf.br/nfe',
        infNFe: {
          '@_Id': `NFe${chave}`,
          '@_versao': '4.00',
          ...data
        }
      }
    };

    const xml = parser.build(xmlData);
    return {
      xml: xml,
      chave_acesso: chave,
    };
  }
}