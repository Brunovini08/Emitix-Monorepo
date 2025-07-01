import  { ICMS90 } from "src/core/nfe/domain/values-objects/nfe-emitir/det/imposto/ICMS/ICMS90.vo";
import type { ICMS90DTo } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS90/ICMS90.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class ICMS90Mapper {
  static fromDto(dto: ICMS90DTo): ICMS90 {
    return new ICMS90({
      orig: dto.orig,
      CST: dto.CST,
      modBC: dto.modBC,
      pRedBC: ParserUtils.parseDecimal(dto.pRedBC),
      vBC: ParserUtils.parseDecimal(dto.vBC),
      pICMS: ParserUtils.parseDecimal(dto.pICMS),
      vICMS: ParserUtils.parseDecimal(dto.vICMS),
      vBCFCP: ParserUtils.parseDecimalOptional(dto.vBCFCP),
      vFCP: ParserUtils.parseDecimalOptional(dto.vFCP),
      vICMSOp: ParserUtils.parseDecimalOptional(dto.vICMSOp),
      pDif: ParserUtils.parseDecimalOptional(dto.pDif),
      vICMSDif: ParserUtils.parseDecimalOptional(dto.vICMSDif),
      pFCP: ParserUtils.parseDecimalOptional(dto.pFCP),
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