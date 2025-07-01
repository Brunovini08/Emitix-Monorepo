import { TInfRespTec as TInfRespTecVO } from "../../../values-objects/nfe-emitir/infRespecTec/TInfRespTec.vo";
import { TInfRespTec } from "../../../types/complex_types/TInfRespTec/TInfRespTec";
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