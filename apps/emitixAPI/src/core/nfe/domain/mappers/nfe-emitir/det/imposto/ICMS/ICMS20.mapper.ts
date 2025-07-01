import  { ICMS20 } from "src/core/nfe/domain/values-objects/nfe-emitir/det/imposto/ICMS/ICMS20.vo";
import type { ICMS20Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS20/ICMS20.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class ICMS20Mapper {
  static fromDto(dto: ICMS20Dto): ICMS20 {
    return new ICMS20({
      orig: dto.orig,
      CST: dto.CST,
      modBC: dto.modBC,
      pRedBC: ParserUtils.parseDecimal(dto.pRedBC),
      vBC: ParserUtils.parseDecimal(dto.vBC),
      pICMS: ParserUtils.parseDecimal(dto.pICMS),
      vICMS: ParserUtils.parseDecimal(dto.vICMS),
      vBCFCP: ParserUtils.parseDecimalOptional(dto.vBCFCP),
      pFCP: ParserUtils.parseDecimalOptional(dto.pFCP),
      vFCP: ParserUtils.parseDecimalOptional(dto.vFCP),
      vICMSDeson: ParserUtils.parseDecimalOptional(dto.vICMSDeson),
      motDesICMS: dto.motDesICMS,
      indDeduzDeson: dto.indDeduzDeson,
    });
  }
}