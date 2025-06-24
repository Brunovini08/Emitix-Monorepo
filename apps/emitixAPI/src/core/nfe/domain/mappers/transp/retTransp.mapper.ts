import type { retTranspDto } from "src/shared/common/dtos/infNfe/transp/retTransp/retTransp.dto";
import { retTransp } from "../../values-objects/transp/retTransp.vo";

export class RetTranspMapper {
  static fromDto(dto: retTranspDto): retTransp {
    return new retTransp({
      CFOP: dto.CFOP,
      cMunFG: dto.cMunFG,
      pICMSRet: dto.pICMSRet,
      vBCRet: dto.vBCRet,
      vICMSRet: dto.vICMSRet,
      vServ: dto.vServ
    })
  }
}