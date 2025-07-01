import { ICMSSN101 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS101.vo";
import type { ICMSSN101Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMSSN101/ICMSSN101.dto";
export class ICMSSN101Mapper {
  static fromDto(dto: ICMSSN101Dto): ICMSSN101 {
    return new ICMSSN101({
      orig: dto.orig,
      CSOSN: dto.CSOSN,
      pCredSN: String(dto.pCredSN),
      vCredICMSSN: String(dto.vCredICMSSN),
    });
  }
}