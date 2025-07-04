import { NfeConsultaCadastroEntity } from "../../entities/nfe-consulta-cadastro.entity";
import { TEnvConsCad } from "../../types/complex_types/TCons/TEnvConsCad";
import { InfConsMapper } from "./infCons.mapper";

export class NfeConsultaCadastroMapper {
  static fromDto(data: TEnvConsCad): NfeConsultaCadastroEntity {
    return new NfeConsultaCadastroEntity({
      infCons: InfConsMapper.fromDto(data.ConsCad.infCons),
      versao: String(data.ConsCad.versao || "4.00")
    })
  }
}