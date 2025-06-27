import { PISAliq } from "src/core/nfe/domain/values-objects/det/imposto/PIS/pisAliq.vo";
import type { PISAliqDto } from "src/shared/common/dtos/infNfe/det/impostos/pis/pisAli.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class PISAliqMapper {
  static fromDto(dto: PISAliqDto): PISAliq {
    return new PISAliq({
      vBC: ParserUtils.parseDecimal(dto.vBC),
      pPIS: ParserUtils.parseDecimal(dto.pPIS),
      vPIS: ParserUtils.parseDecimal(dto.vPIS),
      CST: ParserUtils.parseString(dto.CST),
    });
  }
}