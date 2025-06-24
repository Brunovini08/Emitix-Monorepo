import { COFINSQtde } from "src/core/nfe/domain/values-objects/det/imposto/COFINS/cofinsQtde.vo";
import { confinsQtdeDto } from "src/shared/common/dtos/infNfe/det/impostos/cofins/confinsQtde.dto";

export class COFINSQtdeMapper {
  static fromDto(dto: confinsQtdeDto): COFINSQtde {
    return new COFINSQtde({
      CST: dto.CST,
      qBCProd: Number(dto.qBCProd),
      vAliqProd: Number(dto.vAliqProd),
      vCOFINS: Number(dto.vCOFINS),
    });
  }
}