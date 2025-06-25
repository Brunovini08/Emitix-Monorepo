import { PIS } from "src/core/nfe/domain/values-objects/det/imposto/PIS/pis.vo";
import type { pisDto } from "src/shared/common/dtos/infNfe/det/impostos/pis/pis.dto";
import { PISAliqMapper } from "./PISAliq.mapper";
import { PISQtdeMapper } from "./PISQtde.mapper";
import { PISNTMapper } from "./PISNT.mapper";
import { PISOutrMapper } from "./PISOutr.mapper";

export class PISMapper {
  static fromDto(dto: pisDto): PIS {
    return new PIS({
      PISAliq: dto.PISAliq ? PISAliqMapper.fromDto(dto.PISAliq) : undefined,
      PISQtde: dto.PISQtde ? PISQtdeMapper.fromDto(dto.PISQtde) : undefined,
      PISNT: dto.PISNT ? PISNTMapper.fromDto(dto.PISNT) : undefined,
      PISOutr: dto.PISOutr ? PISOutrMapper.fromDto(dto.PISOutr) : undefined,
    });
  }
}