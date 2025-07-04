import { pagDto } from "src/shared/common/dtos/infNfe/pag/pag.dto";
import { CardMapper } from "./card.mapper";
import { detPag } from "../../../values-objects/nfe-emitir/pag/detPag.vo";
import { pag } from "../../../values-objects/nfe-emitir/pag/pag.vo";

export class PagMapper {
  static fromDto(dto: pagDto): pag {
    return new pag({
      detPag: dto.detPag.map(item => new detPag({
        tPag:  String(item.tPag),
        vPag:  String(item.vPag),
        indPag: item.indPag ? String(item.indPag) : undefined,
        xPag: item.xPag ? String(item.xPag) : undefined,
        card: item.card ? CardMapper.fromDto(item.card) : undefined
      })),
        vTroco: dto.vTroco ? String(dto.vTroco) : undefined
      })
  }
}