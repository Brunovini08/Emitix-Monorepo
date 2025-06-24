import { PISST } from "src/core/nfe/domain/values-objects/det/imposto/PISST/pisst.vo";
import type { pisStDto } from "src/shared/common/dtos/infNfe/det/impostos/pisst/pisst.dto";
import { BaseCalcMapper } from "./baseCalc.mapper";
import { QuantMapper } from "./quant.mapper";


export class PISSTMapper {
  static fromDto(dto: pisStDto): PISST {
    return new PISST({
      baseCalc: BaseCalcMapper.fromDto(dto.baseCalc),
      quant: QuantMapper.fromDto(dto.quant),
      vPIS: Number(dto.vPIS),
      indSomaPISST: dto.indSomaPISST,
    });
  }
}