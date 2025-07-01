import type { agropecuarioDto } from "src/shared/common/dtos/infNfe/agropecuario/agropecuario.dto";
import { agropecuario } from "../../values-objects/agropecuario/agropecuario.vo";
import { DefensivoMapper } from "./defensivo.vo.mapper";
import { GuiaTransitoMapper } from "./guiaTransito.mapper";
import type { defensivoDto } from "src/shared/common/dtos/infNfe/agropecuario/defensivo.dto";

export class AgropecuarioMapper {
  static fromDto(dto: agropecuarioDto): agropecuario {
    return new agropecuario({
      defensivo: dto.defensivo.map((defensivo: defensivoDto) => DefensivoMapper.fromDto(defensivo)),
      guiaTransito: GuiaTransitoMapper.fromDto(dto.guiaTransito),
    })
  }
}