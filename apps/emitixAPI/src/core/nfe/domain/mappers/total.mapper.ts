import type { totalDto } from "src/shared/common/dtos/infNfe/total/total.dto";
import { Total } from "../values-objects/total/total.vo";
import { ICMSTotMapper } from "./total/ICMSTot.mapper";
import { ISSQNtotMapper } from "./total/ISSQNtot.mapper";
import { RetTribMapper } from "./total/retTrib.mapper";

export class TotalMapper {
  static fromDto(dto: totalDto): Total {
    return new Total({
      ICMSTot: ICMSTotMapper.fromDto(dto.ICMSTot),
      ISSQNtot: dto.ISSQNtot ? ISSQNtotMapper.fromDto(dto.ISSQNtot) : undefined,
      retTrib: dto.retTrib ? RetTribMapper.fromDto(dto.retTrib) : undefined,
    });
  }
}