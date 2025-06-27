import  { ICMS70 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS70.vo";
import type { ICMS70Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS70/ICMS70.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class ICMS70Mapper {
  static fromDto(dto: ICMS70Dto): ICMS70 {
    return new ICMS70({
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
      modBCST: dto.modBCST,
      pMVAST: ParserUtils.parseDecimalOptional(dto.pMVAST),
      pRedBCST: ParserUtils.parseDecimalOptional(dto.pRedBCST),
      vBCST: ParserUtils.parseDecimal(dto.vBCST),
      pICMSST: ParserUtils.parseDecimalOptional(dto.pICMSST),
      vICMSST: ParserUtils.parseDecimalOptional(dto.vICMSST),
      vBCFCPST: ParserUtils.parseDecimalOptional(dto.vBCFCPST),
      pFCPST: ParserUtils.parseDecimalOptional(dto.pFCPST),
      vFCPST: ParserUtils.parseDecimalOptional(dto.vFCPST),
      vICMSDeson: ParserUtils.parseDecimalOptional(dto.vICMSDeson),
      motDesICMS: dto.motDesICMS,
      indDeduzDeson: dto.indDeduzDeson,
      vICMSSTDeson: ParserUtils.parseDecimalOptional(dto.vICMSSTDeson),
      motDesICMSST: dto.motDesICMSST,
    });
  }
}