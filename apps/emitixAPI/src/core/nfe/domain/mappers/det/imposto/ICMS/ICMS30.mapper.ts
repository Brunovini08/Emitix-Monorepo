import { ICMS30 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS30.vo";
import type { ICMS30Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMS30/ICMS30.dto";

export class ICMS30Mapper {
  static fromDto(dto: ICMS30Dto): ICMS30 {
    return new ICMS30({
      orig: dto.orig,
      CST: dto.CST,
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
    });
  }
}