import { Injectable } from "@nestjs/common";
import { XMLBuilder } from "fast-xml-parser";
import { ieNoOpen } from "helmet";
import { NfeConsultaCadastroJsonInterface } from "src/core/nfe/domain/interfaces/nfe-consulta-cadastro/nfeConsultaCadastroJson.interface";

@Injectable()
export class NFeConsultaCadastroBuilder {
  async consultaCadastro(
    dataFormat: NfeConsultaCadastroJsonInterface,
    versao: string
  ) {
    const parser = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    const documentType = dataFormat.ConsCad.infCons.CNPJ ? {
      CNPJ: dataFormat.ConsCad.infCons.CNPJ
    } : {
      CPF: dataFormat.ConsCad.infCons.CPF
    }

    const objectFormat = {
      infCons: {
        xServ: dataFormat.ConsCad.infCons.xServ,
        UF: dataFormat.ConsCad.infCons.UF,
        IE: dataFormat.ConsCad.infCons.IE,
        ...documentType,
      }
    }

    const xmlData = {
      ConsCad: {
        '@_xmlns': 'http://www.portalfiscal.inf.br/nfe',
        '@_versao': versao,
        ...objectFormat
      }
    };

    return Promise.resolve(parser.build(xmlData));
  }
}