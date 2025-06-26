import  { ICMS51 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS51.vo";
import type { ICMS51Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS51/ICMS51.dto";

export class ICMS51Mapper {
  static fromDto(dto: ICMS51Dto): ICMS51 {
    return new ICMS51({
      orig: dto.orig,
      CST: dto.CST,
      modBC: dto.modBC,
      pRedBC: String(dto.pRedBC),
      cBenefRBC: dto.cBenefRBC,
      vBC: String(dto.vBC),
      pICMS: String(dto.pICMS),
      vICMSOp: String(dto.vICMSOp),
      pDif: String(dto.pDif),
      vICMSDif: String(dto.vICMSDif),
      vICMS: String(dto.vICMS),
      vBCFCP: String(dto.vBCFCP),
      vFCP: String(dto.vFCP),
      pFCPDif: String(dto.pFCPDif),
      vFCPDif: String(dto.vFCPDif),
      vFCPEfet: String(dto.vFCPEfet),
    });
  }
}