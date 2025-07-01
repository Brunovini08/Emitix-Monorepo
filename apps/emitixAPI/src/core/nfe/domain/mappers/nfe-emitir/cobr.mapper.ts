import { cobrDto } from "src/shared/common/dtos/infNfe/cobr/cobr.dto";
import { fat } from "../../values-objects/nfe-emitir/cobr/fat.vo";
import { dup } from "../../values-objects/nfe-emitir/cobr/dup.vo";
import { cobr } from "../../values-objects/nfe-emitir/cobr/cobr.vo";


export class CobrMapper {
  static fromDto(dto: cobrDto): cobr {
    return new cobr({
      fat: dto.fat ? new fat({
        nFat: String(dto.fat.nFat),
        vOrig: String(dto.fat.vOrig),
        vDesc: String(dto.fat.vDesc),
        vLiq: String(dto.fat.vLiq)
      }) : undefined,
      dup: dto.dup?.map(item => new dup({
          vDup: String(item.vDup),
          nDUp: String(item.nDUp),
          dVenc: String(item.dVenc)
        })) || []
    })
  }
}