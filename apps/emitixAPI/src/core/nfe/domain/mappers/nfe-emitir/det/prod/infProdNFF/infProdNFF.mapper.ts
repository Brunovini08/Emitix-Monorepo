import { InfProdNFF } from "../../../../values-objects/det/prod/infProdNFF.vo";
import { infProdNFFDto } from "src/shared/common/dtos/infNfe/det/prod/infProdNFF/infProdNFF.dto";

export class InfProdNFFMapper {
  static fromDto(dto: infProdNFFDto): InfProdNFF {
    return new InfProdNFF({
      cOperNFF: String(dto.cOperNFF),
      cProdFisco: String(dto.cProdFisco),
    });
  }
}