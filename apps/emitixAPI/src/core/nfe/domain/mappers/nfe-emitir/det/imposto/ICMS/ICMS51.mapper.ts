import  { ICMS51 } from "src/core/nfe/domain/values-objects/nfe-emitir/det/imposto/ICMS/ICMS51.vo";
import type { ICMS51Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS51/ICMS51.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class ICMS51Mapper {
  static fromDto(dto: ICMS51Dto): ICMS51 {
    return new ICMS51({
      orig: dto.orig,
      CST: dto.CST,
      modBC: dto.modBC,
      pRedBC: ParserUtils.parseDecimalOptional(dto.pRedBC),
      cBenefRBC: dto.cBenefRBC,
      vBC: ParserUtils.parseDecimalOptional(dto.vBC),
      pICMS: ParserUtils.parseDecimalOptional(dto.pICMS),
      vICMSOp: ParserUtils.parseDecimalOptional(dto.vICMSOp),
      pDif: ParserUtils.parseDecimalOptional(dto.pDif),
      vICMSDif: ParserUtils.parseDecimalOptional(dto.vICMSDif),
      vICMS: ParserUtils.parseDecimalOptional(dto.vICMS),
      vBCFCP: ParserUtils.parseDecimalOptional(dto.vBCFCP),
      vFCP: ParserUtils.parseDecimalOptional(dto.vFCP),
      pFCPDif: ParserUtils.parseDecimalOptional(dto.pFCPDif),
      vFCPDif: ParserUtils.parseDecimalOptional(dto.vFCPDif),
      vFCPEfet: ParserUtils.parseDecimalOptional(dto.vFCPEfet),
    });
  }
}