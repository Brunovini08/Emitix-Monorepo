import type { retTribDto } from "src/shared/common/dtos/infNfe/total/retTrib/retTrib.dto";
import { retTrib } from "../../values-objects/total/retTrib.vo";

export class RetTribMapper {
  static fromDto(dto: retTribDto): retTrib {
    return new retTrib({
      vRetPIS: dto.vRetPIS,
      vRetCOFINS: dto.vRetCOFINS,
      vRetCSLL: dto.vRetCSLL,
      vBCIRRF: dto.vBCIRRF,
      vIRRF: dto.vIRRF,
      vBCRetPrev: dto.vBCRetPrev,
      vRetPRev: dto.vRetPRev,
    });
  }
}