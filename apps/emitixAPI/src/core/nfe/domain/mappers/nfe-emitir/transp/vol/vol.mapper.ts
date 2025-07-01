import type { volDto } from "src/shared/common/dtos/infNfe/transp/vol/vol.dto";
import { vol } from "../../../../values-objects/nfe-emitir/transp/vol/vol.vo";
import { LacreMapper } from "./lacre.mapper";
export class volMapper {
  static fromDto(dto: volDto): vol {
    return new vol({
      esp: dto.esp,
      lacres: LacreMapper.fromDto(dto.lacres),
      marca: dto.marca,
      nVol: dto.nVol,
      pesoB: dto.pesoB,
      pesoL: dto.pesoL,
      qVol: dto.qVol
    })
  }
}