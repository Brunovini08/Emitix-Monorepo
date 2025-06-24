import { COFINSAliq } from "src/core/nfe/domain/values-objects/det/imposto/COFINS/cofinsAliq.vo";
import type { confinsAliqDto } from "src/shared/common/dtos/infNfe/det/impostos/cofins/confinsAliq.dto";

export class COFINSAliqMapper {
  static fromDto(dto: confinsAliqDto): COFINSAliq {
    return new COFINSAliq({
      CST: dto.CST,
      pCOFINS: Number(dto.pCOFINS),
      vCOFINS: Number(dto.vCOFINS),
    });
  }
}