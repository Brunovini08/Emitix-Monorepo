import { TLocalVO } from "../values-objects/tlocal.vo";
import type { TLocal } from "../types/primitivies_types/TLocal";

export class RetiradaMapper {
  static fromDto(dto: TLocal): TLocalVO {
    return new TLocalVO({
      xLgr: String(dto.xLgr),
      nro: String(dto.nro),
      xBairro: String(dto.xBairro),
      cMun: String(dto.cMun),
      xMun: String(dto.xMun),
      UF: String(dto.UF),
    });
  }
}