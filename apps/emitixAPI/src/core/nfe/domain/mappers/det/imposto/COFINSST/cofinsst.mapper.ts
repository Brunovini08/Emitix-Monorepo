import { COFINSST } from "src/core/nfe/domain/values-objects/det/imposto/COFINSST/cofinsst.vo";
import type { cofinsSTDto } from "src/shared/common/dtos/infNfe/det/impostos/cofinsst/cofinsst.dto";
import { BaseCalcMapper } from "./baseCalc.mapper";
import { QuantMapper } from "./quant.mapper";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class COFINSSTMapper {
  static fromDto(dto: cofinsSTDto): COFINSST {
    return new COFINSST({
      baseCalc: dto.baseCalc ? BaseCalcMapper.fromDto(dto.baseCalc) : undefined,
      quant: dto.quant ? QuantMapper.fromDto(dto.quant) : undefined,
      vCOFINS: ParserUtils.parseDecimal(dto.vCOFINS),
      indSomaCOFINSST: dto.indSomaCOFINSST,
    });
  }
}