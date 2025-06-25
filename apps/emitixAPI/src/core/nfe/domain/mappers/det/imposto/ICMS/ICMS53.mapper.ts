import { ICMS53 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS53.vo";
import type { ICMS53Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS53/ICMS53.dto";

export class ICMS53Mapper {
  static fromDto(dto: ICMS53Dto): ICMS53 {
    return new ICMS53({
      orig: dto.orig,
      CST: dto.CST,
      adRemICMS: String(dto.adRemICMS),
      vICMSMonoOp: String(dto.vICMSMonoOp),
      pDif: String(dto.pDif),
      vICMSMonoDif: String(dto.vICMSMonoDif),
      vICMSMono: String(dto.vICMSMono),
      qBCMonoDif: String(dto.qBCMonoDif),
      adRemICMSDif: String(dto.adRemICMSDif),
      qBCMono: String(dto.qBCMono),
    });
  }
}