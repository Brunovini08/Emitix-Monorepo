import type { canaDto } from "src/shared/common/dtos/infNfe/cana/cana.dto";
import { ForDiaMapper } from "./forDia.mapper";
import { DeducMapper } from "./deduc.mapper";
import { cana } from "../../../values-objects/nfe-emitir/cana/cana.vo";

export class CanaMapper {
  static fromDto(dto: canaDto): cana {
    return new cana({
      safra: String(dto.safra),
      ref: String(dto.ref),
      forDia: dto.forDia.map(forDia => ForDiaMapper.fromDto(forDia)),
      qTotMes: Number(dto.qTotMes),
      qTotAnt: Number(dto.qTotAnt),
      qTotGer: Number(dto.qTotGer),
      deduc: dto.deduc.map((deduc) => DeducMapper.fromDto(deduc)),
      vFor: Number(dto.vFor),
      vTotDed: Number(dto.vTotDed),
      vLiqFor: Number(dto.vLiqFor),
    })
  }
}