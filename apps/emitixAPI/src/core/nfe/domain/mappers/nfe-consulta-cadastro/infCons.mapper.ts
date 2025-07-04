import { TInfCons } from "../../types/primitivies_types/TInfCons";
import { InfCons } from "../../values-objects/nfe-consulta-cadastro/infCons.vo";

export class InfConsMapper {
  static fromDto(data: TInfCons): InfCons {
    return new InfCons({
      IE: data.IE? String(data.IE) : undefined,
      UF: String(data.UF),
      xServ: String(data.xServ),
      CNPJ: data.CNPJ ? String(data.CNPJ) : undefined,
      CPF: data.CPF ? String(data.CPF) : undefined
    })
  }
}