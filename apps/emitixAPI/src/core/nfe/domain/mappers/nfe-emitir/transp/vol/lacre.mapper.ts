import type { lacresDto } from "src/shared/common/dtos/infNfe/transp/vol/lacres.dto";
import { lacres } from "../../../../values-objects/nfe-emitir/transp/vol/lacres.vo";

export class LacreMapper {
  static fromDto(dto: lacresDto): lacres {
    return new lacres({
      nLacre: dto.nLacre
    })
  }
}