import { ImpostoDevol } from "src/core/nfe/domain/values-objects/det/impostoDevol/impostoDevo.vo";
import type { impostoDevolDto } from "src/shared/common/dtos/infNfe/det/impostoDevol/impostoDevol.dto";


export class ImpostoDevolMapper {
  static fromDto(dto: impostoDevolDto): ImpostoDevol {
    return new ImpostoDevol({
      IPI: dto.IPI,
      pDevol: dto.pDevol
    })
  }
}