import { Injectable } from "@nestjs/common";
import { XMLBuilder } from "fast-xml-parser";
import { NfeConsultaJsonInterface } from "src/core/nfe/domain/interfaces/nfe-consulta/nfe-consulta-json.interface";

@Injectable()
export class NFeConsultaBuilder {
  async consultaNFe(
    dataFormat: NfeConsultaJsonInterface,
    versao: string
  ) {

    const parser = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    const objectFormat = {
      tpAmb: dataFormat.consSitNFe.tpAmb,
      xServ: dataFormat.consSitNFe.xServ,
      chNFe: dataFormat.consSitNFe.chNFe,
    }

    const xmlData = {
      consSitNFe: {
        '@_xmlns': 'http://www.portalfiscal.inf.br/nfe',
        '@_versao': versao,
        ...objectFormat
      }
    };

    const xml =  parser.build(xmlData);
    console.log({
      xml: xml
    })
    return xml
  } 
}