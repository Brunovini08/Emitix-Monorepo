import type { forDiaDto } from "src/shared/common/dtos/infNfe/cana/forDia/forDia.dto";
import { forDia } from "../../values-objects/cana/forDia/forDia.vo";

export class ForDiaMapper {
  static fromDto(dto: forDiaDto): forDia {
    return new forDia({
      qtde: Number(dto.qtde),
      dia: Number(dto.dia),
    })
  }
}