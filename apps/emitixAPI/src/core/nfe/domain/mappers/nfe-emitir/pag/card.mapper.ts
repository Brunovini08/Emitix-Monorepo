import type { cardDto } from "src/shared/common/dtos/infNfe/pag/card.dto";
import { card } from "../../../values-objects/pag/card.vo";

export class CardMapper {
  static fromDto(dto: cardDto): card {
    return new card({
      tpIntegra: String(dto.tpIntegra),
      CNPJ: dto.CNPJ ? String(dto.CNPJ) : undefined,
      tBand: dto.tBand ? String(dto.tBand) : undefined,
      cAut: dto.cAut ? String(dto.cAut) : undefined,
    });
  }
}