import { COFINSST } from "src/core/nfe/domain/values-objects/det/imposto/COFINSST/cofinsst.vo";
import type { cofinsSTDto } from "src/shared/common/dtos/infNfe/det/impostos/cofinsst/cofinsst.dto";
import { BaseCalcMapper } from "./baseCalc.mapper";
import { QuantMapper } from "./quant.mapper";

export class COFINSSTMapper {
  static fromDto(dto: cofinsSTDto): COFINSST {
    return new COFINSST({
      baseCalc: BaseCalcMapper.fromDto(dto.baseCalc),
      quant: QuantMapper.fromDto(dto.quant),
      vCOFINS: Number(dto.vCOFINS),
      indSomaCOFINSST: dto.indSomaCOFINSST,
    });
  }
}