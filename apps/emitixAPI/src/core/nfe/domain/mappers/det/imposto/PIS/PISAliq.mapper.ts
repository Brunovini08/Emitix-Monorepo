import { PISAliq } from "src/core/nfe/domain/values-objects/det/imposto/PIS/pisAliq.vo";
import type { PISAliqDto } from "src/shared/common/dtos/infNfe/det/impostos/pis/pisAli.dto";

export class PISAliqMapper {
  static fromDto(dto: PISAliqDto): PISAliq {
    return new PISAliq({
      vBC: Number(dto.vBC),
      pPIS: Number(dto.pPIS),
      vPIS: Number(dto.vPIS),
      CST: String(dto.CST),
    });
  }
}