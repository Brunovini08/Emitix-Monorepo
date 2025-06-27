import  { ICMS10 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS10.vo";
import type { ICMS10Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS10/ICMS10.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class ICMS10Mapper {
  static fromDto(dto: ICMS10Dto): ICMS10 {
    return new ICMS10({
      orig: dto.orig,
      CST: dto.CST,
      modBC: dto.modBC,
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
      VICMSST: ParserUtils.parseDecimalOptional(dto.VICMSST),
      vBCFCPST: ParserUtils.parseDecimalOptional(dto.vBCFCPST),
      pFCPST: ParserUtils.parseDecimalOptional(dto.pFCPST),
      vFCPPST: ParserUtils.parseDecimalOptional(dto.vFCPPST),
      vICMSSTDeson: ParserUtils.parseDecimalOptional(dto.vICMSSTDeson),
      motDesICMSST: dto.motDesICMSST,
    });
  }
}