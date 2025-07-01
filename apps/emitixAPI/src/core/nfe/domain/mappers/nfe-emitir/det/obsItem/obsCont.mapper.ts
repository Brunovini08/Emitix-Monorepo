import { ObsContent } from "src/core/nfe/domain/values-objects/det/obsItem/obsCont.vo";
import type { obsContentDto } from "src/shared/common/dtos/infNfe/det/obsItem/obsContent.dto";

export class ObsContMapper {
  static fromDto(dto: obsContentDto): ObsContent {
    return new ObsContent({
      xCampo: String(dto.xCampo),
      xTexto: String(dto.xTexto)
    })
  } 
}