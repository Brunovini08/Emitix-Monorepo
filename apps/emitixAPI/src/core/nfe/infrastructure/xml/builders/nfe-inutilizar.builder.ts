import { create } from "xmlbuilder2"
import { Injectable } from "@nestjs/common";

@Injectable()
export class NFeInutilizarBuilder {
  async inutilizarNFeXml(
    accessKey: string,
    objectFormat: any,
    versao: string
  ) {
    const root = create({ inutNFe: objectFormat })
    const inutNFe = root.root()
    const infInut = inutNFe.find((node) => node.node.nodeName === 'infInut')
    infInut?.att('Id', accessKey)
    inutNFe.att('xmlns', 'http://www.portalfiscal.inf.br/nfe')
    inutNFe.att('versao', versao)
    const xml = root.end({ prettyPrint: false, headless: true });
    return xml
  }
}