import { PISQtde } from "src/core/nfe/domain/values-objects/det/imposto/PIS/pisQtde.vo";
import type { pisQtdeDto } from "src/shared/common/dtos/infNfe/det/impostos/pis/pisQtde.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class PISQtdeMapper {
  static fromDto(dto: pisQtdeDto): PISQtde {
    return new PISQtde({
      CST: ParserUtils.parseString(dto.CST),
      qBCProd: ParserUtils.parseDecimal(dto.qBCProd),
      vAliqProd: ParserUtils.parseDecimal(dto.vAliqProd),
      vPIS: ParserUtils.parseDecimal(dto.vPIS),
    });
  }
}