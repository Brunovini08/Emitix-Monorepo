import type { obsContentDto } from "src/shared/common/dtos/infNfe/det/obsItem/obsContent.dto";
import { ObsContent } from "../../../values-objects/det/obsItem/obsCont.vo";

export class ObsContMapper {
  static fromDto(dto: obsContentDto): ObsContent {
    return new ObsContent({
      xCampo: String(dto.xCampo),
      xTexto: String(dto.xTexto)
    })
  }
}