import { BaseCalc } from "src/core/nfe/domain/values-objects/nfe-emitir/det/imposto/COFINSST/baseCalc.vo";
import type { baseCalcDto } from "src/shared/common/dtos/infNfe/det/impostos/cofinsst/baseCalc.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class BaseCalcMapper {
  static fromDto(dto: baseCalcDto): BaseCalc {
    return new BaseCalc({
      vBC: ParserUtils.parseDecimal(dto.vBC),
      pCOFINS: ParserUtils.parseDecimal(dto.pCOFINS),
    });
  }
}