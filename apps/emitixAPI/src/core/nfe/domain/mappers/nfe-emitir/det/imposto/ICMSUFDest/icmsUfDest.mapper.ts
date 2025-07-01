import { ICMSUFDest } from "src/core/nfe/domain/values-objects/nfe-emitir/det/imposto/ICMSUFDest/icmsUfDest.vo";
import type { icmsUfDestDto } from "src/shared/common/dtos/infNfe/det/impostos/icmsUfDest/icmsUfDest.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class ICMSUFDestMapper {
  static fromDto(dto: icmsUfDestDto): ICMSUFDest {
    return new ICMSUFDest({
      pFCPUFDest: ParserUtils.parseDecimal(dto.pFCPUFDest),
      pICMSUFDest: ParserUtils.parseDecimal(dto.pICMSUFDest),
      pICMSInter: dto.pICMSInter,
      pICMSInterPart: ParserUtils.parseDecimal(dto.pICMSInterPart),
      vFCPUFDest: ParserUtils.parseDecimal(dto.vFCPUFDest),
      vICMSUFDest: ParserUtils.parseDecimal(dto.vICMSUFDest),
      vICMSUFRemt: ParserUtils.parseDecimal(dto.vICMSUFRemt),
      vBCUFDest: ParserUtils.parseDecimal(dto.vBCUFDest),
      vBCFCPUFDest: ParserUtils.parseDecimal(dto.vBCFCPUFDest),
    });
  }
}