import { ICMS60 } from "src/core/nfe/domain/values-objects/nfe-emitir/det/imposto/ICMS/ICMS60.vo";
import type { ICMS60Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS60/ICMS60.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class ICMS60Mapper {
  static fromDto(dto: ICMS60Dto): ICMS60 {
    return new ICMS60({
      orig: dto.orig,
      CST: dto.CST,
      vBCSTRet: ParserUtils.parseDecimal(dto.vBCSTRet),
      pST: ParserUtils.parseDecimal(dto.pST),
      vICMSSubstituto: ParserUtils.parseDecimal(dto.vICMSSubstituto),
      vICMSSTRet: ParserUtils.parseDecimal(dto.vICMSSTRet),
      vBCFCPSTRet: ParserUtils.parseDecimal(dto.vBCFCPSTRet),
      pFCPSTRet: ParserUtils.parseDecimal(dto.pFCPSTRet),
      vFCPSTRet: ParserUtils.parseDecimal(dto.vFCPSTRet),
      pRedBCEfet: ParserUtils.parseDecimal(dto.pRedBCEfet),
      vBCEfet: ParserUtils.parseDecimal(dto.vBCEfet),
      pICMSEfet: ParserUtils.parseDecimal(dto.pICMSEfet),
      vICMSEfet: ParserUtils.parseDecimal(dto.vICMSEfet),
    });
  }
}   