import { ObsFisco } from "src/core/nfe/domain/values-objects/nfe-emitir/det/obsItem/obsFisco.vo";
import type { obsFiscoDto } from "src/shared/common/dtos/infNfe/det/obsItem/obsFisco.dto";

export class ObsFiscoMapper {
  static fromDto(dto: obsFiscoDto): ObsFisco {
    return new ObsFisco({
      xCampo: dto.xCampo,
      xTexto: dto.xTexto
    })
  }
}