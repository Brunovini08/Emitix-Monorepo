import  { ICMS20 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS20.vo";
import type { ICMS20Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS20/ICMS20.dto";

export class ICMS20Mapper {
  static fromDto(dto: ICMS20Dto): ICMS20 {
    return new ICMS20({
      orig: dto.orig,
      CST: dto.CST,
      modBC: dto.modBC,
      pRedBC: String(dto.pRedBC),
      vBC: String(dto.vBC),
      pICMS: String(dto.pICMS),
      vICMS: String(dto.vICMS),
      vBCFCP: String(dto.vBCFCP),
      pFCP: String(dto.pFCP),
      vFCP: String(dto.vFCP),
      vICMSDeson: String(dto.vICMSDeson),
      motDesICMS: dto.motDesICMS,
      indDeduzDeson: dto.indDeduzDeson,
    });
  }
}