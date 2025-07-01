import  { ICMSSN201 } from "src/core/nfe/domain/values-objects/nfe-emitir/det/imposto/ICMS/ICMS201.vo";
  import type { ICMSSN201Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMSSN201/ICMSSN201.dto";

export class ICMSSN201Mapper {
  static fromDto(dto: ICMSSN201Dto): ICMSSN201 {
    return new ICMSSN201({
      orig: dto.orig,
      CSOSN: dto.CSOSN,
      modBCST: dto.modBCST,
      pMVAST: String(dto.pMVAST),
      pRedBCST: String(dto.pRedBCST),
      vBCST: String(dto.vBCST),
      pICMSST: String(dto.pICMSST),
      vICMSST: String(dto.vICMSST),
      vBCFCPST: String(dto.vBCFCPST),
      pFCPST: String(dto.pFCPST),
      vFCPST: String(dto.vFCPST),
      pCredSN: String(dto.pCredSN),
      vCredICMSSN: String(dto.vCredICMSSN),
    });
  }
}