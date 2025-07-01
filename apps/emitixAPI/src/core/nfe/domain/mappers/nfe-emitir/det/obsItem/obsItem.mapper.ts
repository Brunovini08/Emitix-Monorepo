import type { obsItemDto } from "src/shared/common/dtos/infNfe/det/obsItem/obsItem.dto";
import { ObsContMapper } from "./obsCont.mapper";
import { ObsFiscoMapper } from "./obsFisco.mapper";
import { ObsItem } from "src/core/nfe/domain/values-objects/nfe-emitir/det/obsItem/obsItem.vo";

export class ObsItemMapper {
  static fromDto(dto: obsItemDto): ObsItem {
    return new ObsItem({
      obsCont: ObsContMapper.fromDto(dto.obsCont),
      obsFisco: ObsFiscoMapper.fromDto(dto.obsFisco)
    })
  }
}