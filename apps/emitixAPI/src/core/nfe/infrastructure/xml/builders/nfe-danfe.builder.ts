import { Injectable } from "@nestjs/common";
import { create } from "xmlbuilder2";

@Injectable()
export class NFeDanfeBuilder {
  async distribuicaoDfe(
    dataFormat: any,
    versao: string
  ) {
    const root = create({ distDFeInt: dataFormat })
    const distDFeInt = root.root()
    distDFeInt.att('xmlns', 'http://www.portalfiscal.inf.br/nfe')
    distDFeInt.att('versao', String(versao))
    return Promise.resolve(root.end({ prettyPrint: false, headless: true }))
  } 
}