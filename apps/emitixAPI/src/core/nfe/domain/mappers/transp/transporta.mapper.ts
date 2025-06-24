import type { transportaDto } from "src/shared/common/dtos/infNfe/transp/transporta/transporta.dto";
import { transporta } from "../../values-objects/transp/transporta.vo";

export class TransportaMapper {
  static fromDto(dto: transportaDto): transporta {
    return new transporta({
      CNPJ: dto.CNPJ,
      CPF: dto.CPF,
      IE: dto.IE,
      UF: dto.UF,
      xEnder: dto.xEnder,
      xMun: dto.xMun,
      xNome: dto.xNome
    })
  }
}