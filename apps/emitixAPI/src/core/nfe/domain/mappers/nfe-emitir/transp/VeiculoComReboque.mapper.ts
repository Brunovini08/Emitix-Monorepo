import type { veiculoComReboqueDto } from "src/shared/common/dtos/infNfe/transp/veiculoComReboque.dto";
import { veiculoComReboque } from "../../../values-objects/transp/veicComReboque.vo";

export class VeiculoComReboqueMapper {
  static fromDto(dto: veiculoComReboqueDto): veiculoComReboque {
    return new veiculoComReboque({
      reboque: dto.reboque,
      veicTransp: dto.veicTransp
    })
  }
}