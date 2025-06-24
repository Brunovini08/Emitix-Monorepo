import { Quant } from "src/core/nfe/domain/values-objects/det/imposto/COFINSST/quant.vo";
import type { quantDto } from "src/shared/common/dtos/infNfe/det/impostos/cofinsst/quant.dto";

export class QuantMapper {
  static fromDto(dto: quantDto): Quant {
    return new Quant({
      qBCProd: Number(dto.qBCProd),
      vAliqProd: Number(dto.vAliqProd),
    });
  }
}