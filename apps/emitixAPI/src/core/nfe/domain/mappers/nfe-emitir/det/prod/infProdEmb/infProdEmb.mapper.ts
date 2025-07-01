import { InfProdEmb } from "../../../../values-objects/det/prod/infProdEmb.vo";
import { infProdEmbDto } from "src/shared/common/dtos/infNfe/det/prod/infProdEmb/infProdEmb.dto";

export class InfProdEmbMapper {
  static fromDto(dto: infProdEmbDto): InfProdEmb {
    return new InfProdEmb({
      qVolEmb: Number(dto.qVolEmb),
      uEmb: String(dto.uEmb),
      xEmb: String(dto.xEmb),
    });
  }
}