import { PISQtde } from "src/core/nfe/domain/values-objects/det/imposto/PIS/pisQtde.vo";
import type { pisQtdeDto } from "src/shared/common/dtos/infNfe/det/impostos/pis/pisQtde.dto";

export class PISQtdeMapper {
  static fromDto(dto: pisQtdeDto): PISQtde {
    return new PISQtde({
      CST: String(dto.CST),
      qBCProd: Number(dto.qBCProd),
      vAliqProd: Number(dto.vAliqProd),
      vPIS: Number(dto.vPIS),
    });
  }
}