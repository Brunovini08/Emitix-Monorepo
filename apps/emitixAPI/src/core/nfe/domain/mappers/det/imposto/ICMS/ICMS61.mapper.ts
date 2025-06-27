import { ICMS61 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS61.vo";
import type { ICMS61Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS61/ICMS61.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class ICMS61Mapper {
  static fromDto(dto: ICMS61Dto): ICMS61 {
    return new ICMS61({
      orig: dto.orig,
      CST: dto.CST,
      qBCMonoRet: ParserUtils.parseDecimal(dto.qBCMonoRet),
      adRemICMSRet: ParserUtils.parseDecimal(dto.adRemICMSRet),
      vICMSMonoRet: ParserUtils.parseDecimal(dto.vICMSMonoRet),
    });
  }
}