import { ICMS61 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS61.vo";
import type { ICMS61Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS61/ICMS61.dto";

export class ICMS61Mapper {
  static fromDto(dto: ICMS61Dto): ICMS61 {
    return new ICMS61({
      orig: dto.orig,
      CST: dto.CST,
      qBCMonoRet: String(dto.qBCMonoRet),
      adRemICMSRet: String(dto.adRemICMSRet),
      vICMSMonoRet: String(dto.vICMSMonoRet),
    });
  }
}