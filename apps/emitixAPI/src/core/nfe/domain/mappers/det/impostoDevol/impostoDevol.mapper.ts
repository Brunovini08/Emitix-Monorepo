import type { impostoDevolDto } from "src/shared/common/dtos/infNfe/det/impostoDevol/impostoDevol.dto";
import { ImpostoDevol } from "../../../values-objects/det/impostoDevol/impostoDevo.vo";

export class ImpostoDevolMapper {
  static fromDto(dto: impostoDevolDto): ImpostoDevol {
    return new ImpostoDevol({
      IPI: dto.IPI,
      pDevol: dto.pDevol
    })
  }
}