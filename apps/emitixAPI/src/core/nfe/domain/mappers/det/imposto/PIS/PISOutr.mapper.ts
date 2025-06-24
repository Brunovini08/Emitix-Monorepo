import { PISOutr } from "src/core/nfe/domain/values-objects/det/imposto/PIS/pisOutr.vo";
import type { pisOutrDto } from "src/shared/common/dtos/infNfe/det/impostos/pis/pisOutr.dto";

export class PISOutrMapper {
  static fromDto(dto: pisOutrDto): PISOutr {
    return new PISOutr({
      CST: dto.CST,
      pPis: Number(dto.pPis),
      qBCProd: Number(dto.qBCProd),
      vAliqProd: Number(dto.vAliqProd),
      vPIS: Number(dto.vPIS),
      vBC: Number(dto.vBC),
    });
  }
}