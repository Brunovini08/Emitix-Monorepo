import { ICMS02 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS02.vo";
import type { ICMS02Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS02/ICMS02.dto";

export class ICMS02Mapper {
  static fromDto(dto: ICMS02Dto): ICMS02 {
    return new ICMS02({
      orig: dto.orig,
      CST: dto.CST,
      qBCMono: String(dto.qBCMono),
      adRemICMS: String(dto.adRemICMS),
      vICMSMono: String(dto.vICMSMono),
    });
  }
}