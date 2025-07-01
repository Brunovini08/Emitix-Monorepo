import { NfeConsultaCadastroEntity } from "../../entities/nfe-consulta-cadastro.entity";

export class NfeConsultaCadastroMapper {
  static fromDto(data): NfeConsultaCadastroEntity {
    return new NfeConsultaCadastroEntity({
      infCons: data.infCons,
      versao: String(data.versao || "4.00")
    })
  }
}