import { pagDto } from "src/shared/common/dtos/infNfe/pag/pag.dto";
import { pag } from "../values-objects/pag/pag.vo";
import { detPag } from "../values-objects/pag/detPag.vo";

export class PagMapper {
  static fromDto(dto: pagDto): pag {
    return new pag({
      detPag: dto.detPag.map(item => new detPag({
        tPag: String(item.tPag),
        vPag: String(item.vPag),
        indPag: String(item.indPag),
        xPag: String(item.xPag),
        dPag: String(item.dPag),
        infoPag: String(item.infoPag),
        card: String(item.card)
      })),
      vTroco: Number(dto.vTroco)
    })
  }
}