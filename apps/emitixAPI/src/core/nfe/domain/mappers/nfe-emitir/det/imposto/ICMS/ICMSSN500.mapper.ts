import  { ICMSSN500 } from "src/core/nfe/domain/values-objects/nfe-emitir/det/imposto/ICMS/ICMSSN500.vo";
import type { ICMSSN500Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMSSN500/ICMSSN500.dto";

export class ICMSSN500Mapper {
  static fromDto(dto: ICMSSN500Dto): ICMSSN500 {
    return new ICMSSN500({ 
      orig: dto.orig,
      CSOSN: dto.CSOSN,
      vBCSTRet: String(dto.vBCSTRet),
      pST: String(dto.pST),
      vICMSSubstituto: String(dto.vICMSSubstituto),
      vICMSSTRet: String(dto.vICMSSTRet),
      vBCFCPSTRet: String(dto.vBCFCPSTRet),
      pFCPSTRet: String(dto.pFCPSTRet),
      vFCPSTRet: String(dto.vFCPSTRet),
      pRedBCEfet: String(dto.pRedBCEfet),
      vBCEfet: String(dto.vBCEfet),
      pICMSEfet: String(dto.pICMSEfet),
      vICMSEfet: String(dto.vICMSEfet),
    });
  }
}