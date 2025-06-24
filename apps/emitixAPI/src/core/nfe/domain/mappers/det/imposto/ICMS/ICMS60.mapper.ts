import { ICMS60 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS60.vo";
import type { ICMS60Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS60/ICMS60.dto";

export class ICMS60Mapper {
  static fromDto(dto: ICMS60Dto): ICMS60 {
    return new ICMS60({
      orig: dto.orig,
      CST: dto.CST,
      vBCSTRet: String(dto.vBCSTRet),
      pST: String(dto.pST),
      vICMSSubstituto: String(dto.vICMSSubstituto),
      vICMSSTRet: String(dto.vICMSSTRet),
      vBCFCPSTRet: String(dto.vBCFCPSTRet),
      pFCPST: String(dto.pFCPST),
      vFCPSTRet: String(dto.vFCPSTRet),
      pRedBCEfet: String(dto.pRedBCEfet),
      vBCEfet: String(dto.vBCEfet),
      pICMSEfet: String(dto.pICMSEfet),
      vICMSEfet: String(dto.vICMSEfet),
    });
  }
}