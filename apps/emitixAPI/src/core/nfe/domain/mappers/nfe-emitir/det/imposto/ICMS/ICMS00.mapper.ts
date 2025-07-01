import { ICMS00 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS00.vo";
import type { ICMS00Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS00/ICMS00.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class ICMS00Mapper {
  static fromDto(dto: ICMS00Dto): ICMS00 {
    return new ICMS00({
      orig: dto.orig,
      CST: dto.CST,
      modBC: dto.modBC,
      vBC: ParserUtils.parseDecimal(dto.vBC),
      pICMS: ParserUtils.parseDecimal(dto.pICMS),
      vICMS: ParserUtils.parseDecimal(dto.vICMS),
      pFCP: ParserUtils.parseDecimalOptional(dto.pFCP),
      vFCP: ParserUtils.parseDecimalOptional(dto.vFCP),
    });
  }
}