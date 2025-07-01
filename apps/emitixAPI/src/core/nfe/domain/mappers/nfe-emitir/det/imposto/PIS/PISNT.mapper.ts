import { PISNT } from "src/core/nfe/domain/values-objects/nfe-emitir/det/imposto/PIS/pisNT.vo";
import type { pisNTDto } from "src/shared/common/dtos/infNfe/det/impostos/pis/pisNT.dto";

export class PISNTMapper {
  static fromDto(dto: pisNTDto): PISNT {
    return new PISNT({
      CST: dto.CST,
    });
  }
}