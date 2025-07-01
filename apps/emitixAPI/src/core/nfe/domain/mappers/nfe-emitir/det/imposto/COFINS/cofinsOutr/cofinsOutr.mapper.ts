import { COFINSOutr } from "src/core/nfe/domain/values-objects/det/imposto/COFINS/cofinsOutr/cofinsOutr.vo";
import type { cofinsOutrDto } from "src/shared/common/dtos/infNfe/det/impostos/cofins/cofinsOutr/cofinsOutr.dto";
import { BaseCalcMapper } from "./baseCalc.mapper";
import { QuantMapper } from "./quant.mapper";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class COFINSOutrMapper {
  static fromDto(dto: cofinsOutrDto): COFINSOutr {
    return new COFINSOutr({
      CST: dto.CST,
      baseCalc: dto.baseCalc ? BaseCalcMapper.fromDto(dto.baseCalc) : undefined,
      quant: dto.quant ? QuantMapper.fromDto(dto.quant) : undefined,
      vCOFINS: ParserUtils.parseDecimal(dto.vCOFINS),
    });
  }
}