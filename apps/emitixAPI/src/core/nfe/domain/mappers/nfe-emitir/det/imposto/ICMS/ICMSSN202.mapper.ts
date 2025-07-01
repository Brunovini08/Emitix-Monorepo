import  { ICMSSN202 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS202.vo";
import type { ICMSSN202Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMSSN202/ICMS202.dto";

export class ICMSSN202Mapper {
  static fromDto(dto: ICMSSN202Dto): ICMSSN202 {
    return new ICMSSN202({
      orig: dto.orig,
      CSOSN: dto.CSOSN,
      modBCST: dto.modBCST,
      pMVAST: String(dto.pMVAST),
      pRedBCST: String(dto.pRedBCST),
      vBCST: String(dto.vBCST),
      pICMSST: String(dto.pICMSST),
      vICMSST: String(dto.vICMSST),
      vBCFCPST: String(dto.vBCFCPST),
      pFCPST: String(dto.pFCPST),
      vFCPST: String(dto.vFCPST),
    });
  }
}