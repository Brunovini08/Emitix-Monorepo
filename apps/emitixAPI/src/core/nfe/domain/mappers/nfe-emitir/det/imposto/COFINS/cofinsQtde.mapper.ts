import { COFINSQtde } from "src/core/nfe/domain/values-objects/nfe-emitir/det/imposto/COFINS/cofinsQtde.vo";
import { confinsQtdeDto } from "src/shared/common/dtos/infNfe/det/impostos/cofins/confinsQtde.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class COFINSQtdeMapper {
  static fromDto(dto: confinsQtdeDto): COFINSQtde {
    return new COFINSQtde({
      CST: dto.CST,
      qBCProd: ParserUtils.parseDecimal(dto.qBCProd),
      vAliqProd: ParserUtils.parseDecimal(dto.vAliqProd),
      vCOFINS: ParserUtils.parseDecimal(dto.vCOFINS),
    });
  }
}