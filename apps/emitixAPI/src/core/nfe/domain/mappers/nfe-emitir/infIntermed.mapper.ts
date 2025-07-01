import { infIntermedDto } from "src/shared/common/dtos/infNfe/infIntermed/infIntermed.dto";
import { infIntermed } from "../values-objects/infIntermed.vo";

export class InfIntermedMapper {
  static fromDto(dto: infIntermedDto): infIntermed {
    return new infIntermed({
      CNPJ: String(dto.CNPJ),
      idCadIntTran: String(dto.idCadIntTran),
    })
  }
}