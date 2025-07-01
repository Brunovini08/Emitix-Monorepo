import type { TVeiculo } from "../../../types/primitivies_types/TVeiculo";
import { TVeiculo as Veiculo } from "../../../values-objects/nfe-emitir/transp/tveiculo.vo";
export class VeicTranspMapper {
  static fromDto(dto: TVeiculo): Veiculo {
    return new Veiculo({
      placa: dto.placa,
      RNTC: dto.RNTC,
      UF: dto.UF
    })
  }
}