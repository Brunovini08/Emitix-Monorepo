import type { veiculoComReboqueDto } from "src/shared/common/dtos/infNfe/transp/veiculoComReboque.dto";
import { veiculoComReboque } from "../../../values-objects/nfe-emitir/transp/veicComReboque.vo";
import { VeicTranspMapper } from "./veicTransp.mapper";

export class VeiculoComReboqueMapper {
  static fromDto(dto: veiculoComReboqueDto): veiculoComReboque {
    return new veiculoComReboque({
      reboque: dto.reboque.map((reboque) => VeicTranspMapper.fromDto(reboque)),
      veicTransp: VeicTranspMapper.fromDto(dto.veicTransp),
    })
  }
}