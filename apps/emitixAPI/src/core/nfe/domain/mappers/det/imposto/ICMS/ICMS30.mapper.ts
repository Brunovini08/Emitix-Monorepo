import { ICMS30 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS30.vo";
import type { ICMS30Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS30/ICMS30.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class ICMS30Mapper {
  static fromDto(dto: ICMS30Dto): ICMS30 {
    return new ICMS30({
      orig: dto.orig,
      CST: dto.CST,
      modBCST: dto.modBCST,
      pMVAST: ParserUtils.parseDecimal(dto.pMVAST),
      pRedBCST: ParserUtils.parseDecimal(dto.pRedBCST),
      vBCST: ParserUtils.parseDecimal(dto.vBCST),
      pICMSST: ParserUtils.parseDecimal(dto.pICMSST),
      vICMSST: ParserUtils.parseDecimal(dto.vICMSST),
      vBCFCPST: ParserUtils.parseDecimalOptional(dto.vBCFCPST),
      pFCPST: ParserUtils.parseDecimalOptional(dto.pFCPST),
      vFCPST: ParserUtils.parseDecimalOptional(dto.vFCPST),
      vICMSDeson: ParserUtils.parseDecimalOptional(dto.vICMSDeson),
      motDesICMS: dto.motDesICMS,
      indDeduzDeson: dto.indDeduzDeson,
    });
  }
}