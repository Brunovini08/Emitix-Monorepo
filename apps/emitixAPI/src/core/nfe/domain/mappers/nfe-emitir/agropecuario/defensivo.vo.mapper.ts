import type { defensivoDto } from "src/shared/common/dtos/infNfe/agropecuario/defensivo.dto";
import { defensivo } from "../../../values-objects/nfe-emitir/agropecuario/defensivo.vo";

export class DefensivoMapper {
  static fromDto(dto: defensivoDto): defensivo {
    return new defensivo({
      nReceituario: String(dto.nReceituario),
      CPFRespTec: String(dto.CPFRespTec),
    })
  }
}