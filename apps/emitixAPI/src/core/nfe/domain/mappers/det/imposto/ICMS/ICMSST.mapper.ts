import { ICMSST } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMSST.vo";
import type { ICMSSTDto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMSST/ICMSST.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class ICMSSTMapper {
  static fromDto(dto: ICMSSTDto): ICMSST {
    return new ICMSST({
      orig: dto.orig,
      CST: dto.CST,
      vBCSTRet: ParserUtils.parseDecimal(dto.vBCSTRet),
      pST: ParserUtils.parseDecimal(dto.pST),
      vICMSSubstituto: ParserUtils.parseDecimal(dto.vICMSSubstituto),
      vICMSSTRet: ParserUtils.parseDecimal(dto.vICMSSTRet),
      vBCFCPSTRet: ParserUtils.parseDecimalOptional(dto.vBCFCPSTRet),
      pFCPSTRet: ParserUtils.parseDecimalOptional(dto.pFCPSTRet),
      vFCPSTRet: ParserUtils.parseDecimalOptional(dto.vFCPSTRet),
    });
  }
}