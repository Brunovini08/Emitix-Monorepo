import  { ICMS70 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS70.vo";
import type { ICMS70Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS70/ICMS70.dto";

export class ICMS70Mapper {
  static fromDto(dto: ICMS70Dto): ICMS70 {
    return new ICMS70({
      orig: dto.orig,
      CST: dto.CST,
      modBC: dto.modBC,
      pRedBC: String(dto.pRedBC),
      vBC: String(dto.vBC),
      pICMS: String(dto.pICMS),
      vICMS: String(dto.vICMS),
      vBCFCP: String(dto.vBCFCP),
      vFCP: String(dto.vFCP),
      modBCST: dto.modBCST,
      pMVAST: String(dto.pMVAST),
      pRedBCST: String(dto.pRedBCST),
      vBCST: String(dto.vBCST),
      pICMSST: String(dto.pICMSST),
      vICMSST: String(dto.vICMSST),
      vBCFCPST: String(dto.vBCFCPST),
      pFCPST: String(dto.pFCPST),
      vFCPST: String(dto.vFCPST),
      vICMSDeson: String(dto.vICMSDeson),
      motDesICMS: dto.motDesICMS,
      indDeduzDeson: dto.indDeduzDeson,
      vICMSSTDeson: String(dto.vICMSSTDeson),
      motDesICMSST: dto.motDesICMSST,
    });
  }
}