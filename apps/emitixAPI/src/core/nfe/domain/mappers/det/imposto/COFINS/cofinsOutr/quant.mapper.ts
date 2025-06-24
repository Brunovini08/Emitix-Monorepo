import { Quant } from "src/core/nfe/domain/values-objects/det/imposto/COFINS/cofinsOutr/quant.vo";
import type { quantDto } from "src/shared/common/dtos/infNfe/det/impostos/cofins/cofinsOutr/quant.dto";

export class QuantMapper {
  static fromDto(dto: quantDto): Quant {
    return new Quant({
      qBCProd: Number(dto.qBCProd),
      vAliqProd: Number(dto.vAliqProd),
    });
  }
}