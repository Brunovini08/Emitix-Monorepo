import { PIS } from "src/core/nfe/domain/values-objects/det/imposto/PIS/pis.vo";
import type { pisDto } from "src/shared/common/dtos/infNfe/det/impostos/pis/pis.dto";
import { PISAliqMapper } from "./PISAliq.mapper";
import { PISQtdeMapper } from "./PISQtde.mapper";

export class PISMapper {
  static fromDto(dto: pisDto): PIS {
    return new PIS({
      PISAliq: PISAliqMapper.fromDto(dto.PISAliq),
      PISQtde: PISQtdeMapper.fromDto(dto.PISQtde),
      PISNT: PISNTMapper.fromDto(dto.PISNT),
      PISOutr: PISOutrMapper.fromDto(dto.PISOutr),
    });
  }
}