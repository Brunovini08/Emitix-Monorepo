import type { obsItemDto } from "src/shared/common/dtos/infNfe/det/obsItem/obsItem.dto";
import { ObsItem } from "../../../values-objects/det/obsItem/obsItem.vo";
import { ObsContMapper } from "./obsCont.mapper";
import { ObsFiscoMapper } from "./obsFisco.mapper";

export class ObsItemMapper {
  static fromDto(dto: obsItemDto): ObsItem {
    return new ObsItem({
      obsCont: ObsContMapper.fromDto(dto.obsCont),
      obsFisco: ObsFiscoMapper.fromDto(dto.obsFisco)
    })
  }
}