import { Quant } from "src/core/nfe/domain/values-objects/det/imposto/COFINSST/quant.vo";
import type { quantDto } from "src/shared/common/dtos/infNfe/det/impostos/cofinsst/quant.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class QuantMapper {
  static fromDto(dto: quantDto): Quant {
    return new Quant({
      qBCProd: ParserUtils.parseDecimal(dto.qBCProd),
      vAliqProd: ParserUtils.parseDecimal(dto.vAliqProd),
    });
  }
}