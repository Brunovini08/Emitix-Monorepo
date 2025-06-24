import { ICMSUFDest } from "src/core/nfe/domain/values-objects/det/imposto/ICMSUFDest/icmsUfDest.vo";
import type { icmsUfDestDto } from "src/shared/common/dtos/infNfe/det/impostos/icmsUfDest/icmsUfDest.dto";

export class ICMSUFDestMapper {
  static fromDto(dto: icmsUfDestDto): ICMSUFDest {
    return new ICMSUFDest({
      pFCPUFDest: Number(dto.pFCPUFDest),
      pICMSUFDest: Number(dto.pICMSUFDest),
      pICMSInter: dto.pICMSInter,
      pICMSInterPart: Number(dto.pICMSInterPart),
      vFCPUFDest: Number(dto.vFCPUFDest),
      vICMSUFDest: Number(dto.vICMSUFDest),
      vICMSUFRemt: Number(dto.vICMSUFRemt),
      vBCUFDest: Number(dto.vBCUFDest),
      vBCFCPUFDest: Number(dto.vBCFCPUFDest),
    });
  }
}