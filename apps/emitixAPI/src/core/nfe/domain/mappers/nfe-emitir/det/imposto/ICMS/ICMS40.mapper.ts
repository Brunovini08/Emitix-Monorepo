import { ICMS40 } from "src/core/nfe/domain/values-objects/nfe-emitir/det/imposto/ICMS/ICMS40.vo";
import type { ICMS40Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS40/ICMS40.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class ICMS40Mapper {
  static fromDto(dto: ICMS40Dto): ICMS40 {
    return new ICMS40({
      orig: dto.orig,
      CST: dto.CST,
      vICMSDeson: ParserUtils.parseDecimalOptional(dto.vICMSDeson),
      motDesICMS: dto.motDesICMS,
      indDeduzDeson: dto.indDeduzDeson,
    });
  }
}