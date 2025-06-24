import { Injectable } from "@nestjs/common";
import { create } from "xmlbuilder2";

@Injectable()
export class NFeStatusBuilder {
  async statusServico(
    dataFormat: any,
    versao: string
  ) {
    const root = create({ consStatServ: dataFormat })
    const consStatServ = root.root()
    consStatServ.att('xmlns', 'http://www.portalfiscal.inf.br/nfe')
    consStatServ.att('versao', versao)
    return Promise.resolve(root.end({ prettyPrint: false, headless: true }))
  } 
}