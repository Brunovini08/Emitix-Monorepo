import { ICMSST } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMSST.vo";
import type { ICMSSTDto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMSST/ICMSST.dto";

export class ICMSSTMapper {
  static fromDto(dto: ICMSSTDto): ICMSST {
    return new ICMSST({
      orig: dto.orig,
      CST: dto.CST,
      vBCSTRet: String(dto.vBCSTRet),
      pST: String(dto.pST),
      vICMSSubstituto: String(dto.vICMSSubstituto),
      vICMSSTRet: String(dto.vICMSSTRet),
      vBCFCPSTRet: String(dto.vBCFCPSTRet),
      pFCPSTRet: String(dto.pFCPSTRet),
      vFCPSTRet: String(dto.vFCPSTRet),
    });
  }
}