import type { ISSQNtotDto } from "src/shared/common/dtos/infNfe/total/ISSQNtot/ISSQNtot.dto";
import { ISSQNTot } from "../../values-objects/total/ISSQNTot.vo";

export class ISSQNtotMapper {
  static fromDto(dto: ISSQNtotDto): ISSQNTot {
    return new ISSQNTot(dto);
  }
}