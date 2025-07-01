import { BaseCalc } from "src/core/nfe/domain/values-objects/det/imposto/PISST/baseCalc.vo";
import type { baseCalcDto } from "src/shared/common/dtos/infNfe/det/impostos/pisst/baseCalc.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class BaseCalcMapper {
  static fromDto(dto: baseCalcDto): BaseCalc {
    return new BaseCalc({
      vBC: ParserUtils.parseDecimal(dto.vBC),
      pPis: ParserUtils.parseDecimal(dto.pPis),
    });
  }
}