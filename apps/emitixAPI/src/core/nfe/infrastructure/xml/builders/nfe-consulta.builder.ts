import { Injectable } from "@nestjs/common";
import { create } from "xmlbuilder2";

@Injectable()
export class NFeConsultaBuilder {
  async consultaNFe(
    dataFormat: any,
    versao: string
  ) {
    const root = create({ consSitNFe: dataFormat });
    const consSitNFe = root.root();
    consSitNFe.att('xmlns', 'http://www.portalfiscal.inf.br/nfe');
    consSitNFe.att('versao', versao);
    return root.end({ prettyPrint: false, headless: true });
  } 
}