import  { ICMSPart } from "src/core/nfe/domain/values-objects/det/imposto/ICMS/ICMSPART.vo";
import type { ICMSPARTDto } from "src/shared/common/dtos/infNfe/det/impostos/icms/ICMSPART/ICMSTPART.dto";


export class ICMSPartMapper {
  static fromDto(dto: ICMSPARTDto): ICMSPart {
    return new ICMSPart({
      orig: dto.orig,
      CST: dto.CST,
      modBC: dto.modBC,
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
      pBCOp: String(dto.pBCOp),
      UFST: String(dto.UFST),
      pRedBC: String(dto.pRedBC),
    });
  }
}