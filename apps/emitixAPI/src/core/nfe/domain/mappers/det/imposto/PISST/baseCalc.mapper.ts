import { BaseCalc } from "src/core/nfe/domain/values-objects/det/imposto/PISST/baseCalc.vo";
import type { baseCalcDto } from "src/shared/common/dtos/infNfe/det/impostos/pisst/baseCalc.dto";

export class BaseCalcMapper {
  static fromDto(dto: baseCalcDto): BaseCalc {
    return new BaseCalc({
      vBC: Number(dto.vBC),
      pPis: Number(dto.pPis),
    });
  }
}