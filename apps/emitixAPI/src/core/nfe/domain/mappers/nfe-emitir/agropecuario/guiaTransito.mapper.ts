import type { guiaTransitoDto } from "src/shared/common/dtos/infNfe/agropecuario/guiaTransito.dto";
import { guiaTransito } from "../../../values-objects/agropecuario/guiaTransito.vo";

export class GuiaTransitoMapper {
  static fromDto(dto: guiaTransitoDto): guiaTransito {
    return new guiaTransito({
      nGuia: String(dto.nGuia),
      serieGuia: String(dto.serieGuia),
      UFGuia: String(dto.UFGuia),
      tpGuia: String(dto.tpGuia),
    })
  }
} 