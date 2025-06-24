import  { ICMS10 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS10.vo";
import type { ICMS10Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS10/ICMS10.dto";

export class ICMS10Mapper {
  static fromDto(dto: ICMS10Dto): ICMS10 {
    return new ICMS10({
      orig: dto.orig,
      CST: dto.CST,
      modBC: dto.modBC,
      vBC: String(dto.vBC),
      pICMS: String(dto.pICMS),
      vICMS: String(dto.vICMS),
      vBCFCP: String(dto.vBCFCP),
      pFCP: String(dto.pFCP),
      vFCP: String(dto.vFCP),
      modBCST: dto.modBCST,
      pMVAST: String(dto.pMVAST),
      pRedBCST: String(dto.pRedBCST),
      vBCST: String(dto.vBCST),
      pICMSST: String(dto.pICMSST),
      VICMSST: String(dto.VICMSST),
      vBCFCPST: String(dto.vBCFCPST),
      pFCPST: String(dto.pFCPST),
      vFCPPST: String(dto.vFCPPST),
      vICMSSTDeson: String(dto.vICMSSTDeson),
      motDesICMSST: dto.motDesICMSST,
    });
  }
}