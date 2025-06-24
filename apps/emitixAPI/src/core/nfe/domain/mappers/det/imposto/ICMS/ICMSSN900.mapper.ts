import { ICMSSN900 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS900.vo";
import type { ICMSSN900Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMSSN900/ICMSSN900.dto";

export class ICMSSN900Mapper {
  static fromDto(dto: ICMSSN900Dto): ICMSSN900 {
    return new ICMSSN900({
      orig: dto.orig,
      CSOSN: dto.CSOSN,
      modBC: dto.modBC,
      vBC: String(dto.vBC),
      pRedBC: String(dto.pRedBC),
      pICMS: String(dto.pICMS),
      vICMS: String(dto.vICMS),
      modBCST: dto.modBCST,
      pMVAST: String(dto.pMVAST),
      pRedBCST: String(dto.pRedBCST),
      vBCST: String(dto.vBCST),
      pICMSST: String(dto.pICMSST),
      vICMSST: String(dto.vICMSST),
      VBCFCPST: String(dto.VBCFCPST),
      pFCPST: String(dto.pFCPST),
      pCredSN: String(dto.pCredSN),
      vCredICMSSN: String(dto.vCredICMSSN),
    });
  }
}