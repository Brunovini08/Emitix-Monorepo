import { COFINSOutr } from "src/core/nfe/domain/values-objects/det/imposto/COFINS/cofinsOutr/cofinsOutr.vo";
import type { cofinsOutrDto } from "src/shared/common/dtos/infNfe/det/impostos/cofins/cofinsOutr/cofinsOutr.dto";
import { BaseCalcMapper } from "./baseCalc.mapper";
import { QuantMapper } from "./quant.mapper";


export class COFINSOutrMapper {
  static fromDto(dto: cofinsOutrDto): COFINSOutr {
    return new COFINSOutr({
      CST: dto.CST,
      baseCalc: BaseCalcMapper.fromDto(dto.baseCalc),
      quant: QuantMapper.fromDto(dto.quant),
      vCOFINS: Number(dto.vCOFINS),
    });
  }
}