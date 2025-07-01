import { ICMS53 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS53.vo";
import type { ICMS53Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS53/ICMS53.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class ICMS53Mapper {
  static fromDto(dto: ICMS53Dto): ICMS53 {
    return new ICMS53({
      orig: dto.orig,
      CST: dto.CST,
      adRemICMS: ParserUtils.parseDecimal(dto.adRemICMS),
      vICMSMonoOp: ParserUtils.parseDecimal(dto.vICMSMonoOp),
      pDif: ParserUtils.parseDecimal(dto.pDif),
      vICMSMonoDif: ParserUtils.parseDecimal(dto.vICMSMonoDif),
      vICMSMono: ParserUtils.parseDecimal(dto.vICMSMono),
      qBCMonoDif: ParserUtils.parseDecimal(dto.qBCMonoDif),
      adRemICMSDif: ParserUtils.parseDecimal(dto.adRemICMSDif),
      qBCMono: ParserUtils.parseDecimal(dto.qBCMono),
    });
  }
}