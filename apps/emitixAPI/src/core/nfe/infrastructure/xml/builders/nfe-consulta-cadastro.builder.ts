import { Injectable } from "@nestjs/common";
import { create } from "xmlbuilder2";

@Injectable()
export class NFeConsultaCadastroBuilder {
  async consultaCadastro(
    dataFormat: any,
    versao: string
  ) {
    const root = create({ ConsCad: dataFormat })
    const ConsCad = root.root()
    ConsCad.att('xmlns', 'http://www.portalfiscal.inf.br/nfe');
    ConsCad.att('versao', versao)
    return Promise.resolve(root.end({ prettyPrint: false, headless: true }))
  } 
}