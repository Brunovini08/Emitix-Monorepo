import { Arma } from "src/core/nfe/domain/values-objects/det/prod/arma.vo";
import type { armaDto } from "src/shared/common/dtos/infNfe/det/prod/arma/arma.dto";

export class ArmaMapper {
  static fromDto(dto: armaDto): Arma {
    return new Arma({
      nSerie: String(dto.nSerie),
      nCano: String(dto.nCano),
      descr: String(dto.descr),
    });
  }
}