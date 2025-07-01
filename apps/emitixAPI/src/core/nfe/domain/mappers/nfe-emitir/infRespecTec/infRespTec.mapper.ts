import type { infRespTecDto } from "src/shared/common/dtos/infNfe/infRespTec/infRespTec.dto";
import { TInfRespecTecMapper } from "./tInfRespecTec.mapper";
import { infRespTec } from "../../../values-objects/infRespecTec/infRespTec.vo";


export class InfRespTecMapper {
  static fromDto(dto: infRespTecDto): infRespTec {
    return new infRespTec({
      infResTec: TInfRespecTecMapper.fromDto(dto.infResTec)
    })
  }
}