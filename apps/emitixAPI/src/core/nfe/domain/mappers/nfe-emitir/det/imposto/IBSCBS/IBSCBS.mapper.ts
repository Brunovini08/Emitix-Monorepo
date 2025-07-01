import { IBSCBS } from "src/core/nfe/domain/values-objects/nfe-emitir/det/imposto/IBSCBS/ibscbs.vo";
import type { IBSCBSDto } from "src/shared/common/dtos/infNfe/det/impostos/IBSCBS/IBSCBS.dto";

export class IBSCBSMapper {
  static fromDto(dto: IBSCBSDto): IBSCBS {
    return new IBSCBS({
      vDed: Number(dto.vDed),
      vFor: Number(dto.vFor),
      vTotDed: Number(dto.vTotDed),
      vLiqFor: Number(dto.vLiqFor),
    });
  }
} 