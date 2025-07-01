import { PISOutr } from "src/core/nfe/domain/values-objects/nfe-emitir/det/imposto/PIS/pisOutr.vo";
import type { pisOutrDto } from "src/shared/common/dtos/infNfe/det/impostos/pis/pisOutr.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class PISOutrMapper {
  static fromDto(dto: pisOutrDto): PISOutr {
    return new PISOutr({
      CST: dto.CST,
      pPis: ParserUtils.parseDecimal(dto.pPis),
      qBCProd: ParserUtils.parseDecimal(dto.qBCProd),
      vAliqProd: ParserUtils.parseDecimal(dto.vAliqProd),
      vPIS: ParserUtils.parseDecimal(dto.vPIS),
      vBC: ParserUtils.parseDecimal(dto.vBC),
    });
  }
}