import type { infSolicNFFDto } from "src/shared/common/dtos/infNfe/infSolicNFF/infSolicNFF.dto";
import { infSolicNFF } from "../../values-objects/nfe-emitir/infSolicNFF.vo";


export class InfSolicNFFMapper {
  static fromDto(dto: infSolicNFFDto): infSolicNFF {
    return new infSolicNFF({
      xSolic: String(dto.xSolic),
    })
  }
}