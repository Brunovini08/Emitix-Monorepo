import { COFINSAliq } from "src/core/nfe/domain/values-objects/det/imposto/COFINS/cofinsAliq.vo";
import type { confinsAliqDto } from "src/shared/common/dtos/infNfe/det/impostos/cofins/confinsAliq.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class COFINSAliqMapper {
  static fromDto(dto: confinsAliqDto): COFINSAliq {
    return new COFINSAliq({
      CST: dto.CST,
      vBC: ParserUtils.parseDecimal(dto.vBC),
      pCOFINS: ParserUtils.parseDecimal(dto.pCOFINS),
      vCOFINS: ParserUtils.parseDecimal(dto.vCOFINS),
    });
  }
}