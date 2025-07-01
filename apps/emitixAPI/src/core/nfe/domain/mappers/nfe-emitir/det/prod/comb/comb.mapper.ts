import { Comb } from "src/core/nfe/domain/values-objects/det/comb/comb.vo";
import type { combDto } from "src/shared/common/dtos/infNfe/det/prod/comb/comb.dto";

export class CombMapper {
  static fromDto(dto: combDto): Comb {
    return new Comb({
      cProdANP: String(dto.cProdANP),
      descANP: String(dto.descANP),
      UFCons: String(dto.UFCons),
      pGLP: Number(dto.pGLP),
      pGNn: Number(dto.pGNn),
      pGNi: Number(dto.pGNi),
      vPart: Number(dto.vPart),
    });
  }
}