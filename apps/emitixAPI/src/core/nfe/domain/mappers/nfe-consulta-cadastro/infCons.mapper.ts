import { InfCons } from "../../values-objects/nfe-consulta-cadastro/infCons.vo";

export class InfConsMapper {
  static fromDto(data): InfCons {
    return new InfCons({
      IE: String(data.infCons.IE),
      UF: String(data.infCons.UF),
      xServ: String(data.infCons.xServ),
      CNPJ: data.infCons.CNPJ ? String(data.infCons.CNPJ) : undefined,
      CPF: data.infCons.CPF ? String(data.infCons.CPF) : undefined
    })
  }
}