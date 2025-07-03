import { TInfCons } from "../../types/primitivies_types/TInfCons";
import { InfCons } from "../../values-objects/nfe-consulta-cadastro/infCons.vo";

export class InfConsMapper {
  static fromDto(data: TInfCons): InfCons {
    return new InfCons({
      IE: String(data.IE),
      UF: String(data.UF),
      xServ: String(data.xServ),
      CNPJ: data.CNPJ ? String(data.CNPJ) : undefined,
      CPF: data.CPF ? String(data.CPF) : undefined
    })
  }
}