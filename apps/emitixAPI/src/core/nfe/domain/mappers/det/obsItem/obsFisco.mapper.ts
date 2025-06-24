import type { obsFiscoDto } from "src/shared/common/dtos/infNfe/det/obsItem/obsFisco.dto";
import { ObsFisco } from "../../../values-objects/det/obsItem/obsFisco.vo";

export class ObsFiscoMapper {
  static fromDto(dto: obsFiscoDto): ObsFisco {
    return new ObsFisco({
      xCampo: dto.xCampo,
      xTexto: dto.xTexto
    })
  }
}