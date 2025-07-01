import type { TInfRespTec } from "../../types/complex_types/TInfRespTec/TInfRespTec";
import { TInfRespTec as TInfRespTecVO } from "../../values-objects/infRespecTec/TInfRespTec.vo";
import { CSRTMapper } from "./csrt.mapper";

export class TInfRespecTecMapper {
  static fromDto(dto: TInfRespTec): TInfRespTecVO {
    return new TInfRespTecVO({
      CNPJ: String(dto.CNPJ),
      xContato: String(dto.xContato),
      email: String(dto.email),
      fone: String(dto.fone),
      CSRT: CSRTMapper.fromDto(dto.CSRT),
    })
  }
}