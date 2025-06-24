import { ICMS00 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS00.vo";
import type { ICMS00Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS00/ICMS00.dto";

export class ICMS00Mapper {
  static fromDto(dto: ICMS00Dto): ICMS00 {
    return new ICMS00({
      orig: dto.orig,
      CST: dto.CST,
      modBC: dto.modBC,
      vBC: String(dto.vBC),
      pICMS: String(dto.pICMS),
      vICMS: String(dto.vICMS),
      pFCP: String(dto.pFCP),
      vFCP: String(dto.vFCP),
    });
  }
}