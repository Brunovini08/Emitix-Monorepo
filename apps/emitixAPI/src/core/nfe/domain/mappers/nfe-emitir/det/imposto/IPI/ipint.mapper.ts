import type { IPINT } from "src/core/nfe/domain/types/complex_types/TIpi/IPINT";
import { IPINTVO } from "src/core/nfe/domain/values-objects/nfe-emitir/det/imposto/IPI/ipint.vo";

export class IPINTMapper {
  static fromDto(dto: IPINT): IPINTVO {
    return new IPINTVO({
      CST: String(dto.CST),
    });
  }
}