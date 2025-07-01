import type { infSolicNFFDto } from "src/shared/common/dtos/infNfe/infSolicNFF/infSolicNFF.dto";
import { infSolicNFF } from "../values-objects/infSolicNFF.vo";


export class InfSolicNFFMapper {
  static fromDto(dto: infSolicNFFDto): infSolicNFF {
    return new infSolicNFF({
      xSolic: String(dto.xSolic),
    })
  }
}