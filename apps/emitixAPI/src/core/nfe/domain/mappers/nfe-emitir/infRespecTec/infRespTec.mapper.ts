import type { infRespTecDto } from "src/shared/common/dtos/infNfe/infRespTec/infRespTec.dto";
import { infRespTec } from "../../values-objects/infRespecTec/infRespTec.vo";
import { TInfRespecTecMapper } from "./tInfRespecTec.mapper";


export class InfRespTecMapper {
  static fromDto(dto: infRespTecDto): infRespTec {
    return new infRespTec({
      infResTec: TInfRespecTecMapper.fromDto(dto.infResTec)
    })
  }
}