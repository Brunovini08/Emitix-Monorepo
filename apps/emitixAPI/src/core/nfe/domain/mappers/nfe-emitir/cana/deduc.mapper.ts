
import type { deducDto } from "src/shared/common/dtos/infNfe/cana/forDia/deduc.dto";
import { deduc } from "../../../values-objects/cana/forDia/deduc.vo";

export class DeducMapper {
  static fromDto(dto: deducDto): deduc {
    return new deduc({
      xDed: String(dto.xDed),
      vDed: Number(dto.vDed),
    })
  }
}