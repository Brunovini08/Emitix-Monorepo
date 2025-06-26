import { ICMS60 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS60.vo";
import type { ICMS60Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS60/ICMS60.dto";

export class ICMS60Mapper {
  static fromDto(dto: ICMS60Dto): ICMS60 {
    return new ICMS60({
      orig: dto.orig,
      CST: dto.CST,
      vBCSTRet: dto.vBCSTRet ? String(dto.vBCSTRet) : undefined,
      pST: dto.pST ? String(dto.pST) : undefined,
      vICMSSubstituto: dto.vICMSSubstituto ? String(dto.vICMSSubstituto) : undefined,
      vICMSSTRet: dto.vICMSSTRet ? String(dto.vICMSSTRet) : undefined,
      vBCFCPSTRet: dto.vBCFCPSTRet ? String(dto.vBCFCPSTRet) : undefined,
      pFCPST: dto.pFCPST ? String(dto.pFCPST) : undefined,
      vFCPSTRet: dto.vFCPSTRet ? String(dto.vFCPSTRet) : undefined,
      pRedBCEfet: dto.pRedBCEfet ? String(dto.pRedBCEfet) : undefined,
      vBCEfet: dto.vBCEfet ? String(dto.vBCEfet) : undefined,
      pICMSEfet: dto.pICMSEfet ? String(dto.pICMSEfet) : undefined,
      vICMSEfet: dto.vICMSEfet ? String(dto.vICMSEfet) : undefined,
    });
  }
}