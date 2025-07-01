import { ICMSSN102 } from "src/core/nfe/domain/values-objects/nfe-emitir/det/imposto/ICMS/ICMSSN102.vo";
import type { ICMSSN102Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMSSN102/ICMSSN102.dto";

export class ICMSSN102Mapper {
  static fromDto(dto: ICMSSN102Dto): ICMSSN102 {
    return new ICMSSN102({
      orig: dto.orig,
      CSOSN: dto.CSOSN,
    });
  }
}