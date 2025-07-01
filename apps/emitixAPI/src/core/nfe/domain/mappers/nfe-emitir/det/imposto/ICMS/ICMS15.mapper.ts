import  { ICMS15 } from "src/core/nfe/domain/values-objects/nfe-emitir/det/imposto/ICMS/ICMS15.vo";
import type { ICMS15Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS15/ICMS15.dto";

export class ICMS15Mapper {
  static fromDto(dto: ICMS15Dto): ICMS15 {
    return new ICMS15({
      orig: dto.orig,
      CST: dto.CST,
      qBCMono: String(dto.qBCMono),
      adRemICMS: String(dto.adRemICMS),
      vICMSMono: String(dto.vICMSMono),
      qBCMonoReten: String(dto.qBCMonoReten),
      adRemICMSReten: String(dto.adRemICMSReten),
      vICMSMonoReten: String(dto.vICMSMonoReten),
      pRedAdRem: String(dto.pRedAdRem),
      motRedAdRem: dto.motRedAdRem,
    });
  }
}