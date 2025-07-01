import { Rastro } from "src/core/nfe/domain/values-objects/det/prod/rastro.vo";
import { rastroDto } from "src/shared/common/dtos/infNfe/det/prod/rastro/rastro.dto";

export class RastroMapper {
  static fromDto(dto: rastroDto): Rastro {
    return new Rastro({
      nLote: String(dto.nLote),
      qLote: Number(dto.qLote),
      dFab: new Date(dto.dFab.toString()),
      dVal: new Date(dto.dVal.toString()),
      cAgreg: String(dto.cAgreg),
    });
  }
}