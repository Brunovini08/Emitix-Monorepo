import { GCred } from "../../../values-objects/det/prod/gcred.vo";
import { gCredDto } from "src/shared/common/dtos/infNfe/det/prod/gCred/gCred.dto";
export class GCredMapper {
  static fromDto(dto: gCredDto): GCred {
    return new GCred({
      cCredPresumido: String(dto.cCredPresumido),
      pCredPresumido: Number(dto.pCredPresumido),
      vCredPresumido: Number(dto.vCredPresumido),
    });
  }
}