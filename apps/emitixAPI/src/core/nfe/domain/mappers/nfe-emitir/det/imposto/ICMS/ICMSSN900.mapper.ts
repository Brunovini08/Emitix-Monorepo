import { ICMSSN900 } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMS900.vo";
import type { ICMSSN900Dto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMSSN900/ICMSSN900.dto";

export class ICMSSN900Mapper {
  static fromDto(dto: ICMSSN900Dto): ICMSSN900 {
    return new ICMSSN900({
      orig: dto.orig,
      CSOSN: dto.CSOSN,
      modBC: dto.modBC,
      vBC: dto.vBC?.dec,
      pRedBC: dto.pRedBC?.dec,
      pICMS: dto.pICMS?.dec,
      vICMS: dto.vICMS?.dec,
      modBCST: dto.modBCST,
      pMVAST: dto.pMVAST?.dec,
      pRedBCST: dto.pRedBCST?.dec,
      vBCST: dto.vBCST?.dec,
      pICMSST: dto.pICMSST?.dec,
      vICMSST: dto.vICMSST?.dec,
      VBCFCPST: dto.VBCFCPST?.dec,
      pFCPST: dto.pFCPST?.dec,
      pCredSN: dto.pCredSN?.dec,
      vCredICMSSN: dto.vCredICMSSN?.dec,
    });
  }
}