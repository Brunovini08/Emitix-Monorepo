import type { detDto } from "src/shared/common/dtos/infNfe/det/det.dto";
import { Det } from "../../values-objects/det/det.vo";
import { ProdMapper } from "./prod/ProdMapper";

export class DetMapper {
  static fromDto(dto: detDto): Det {
    return new Det({
      prod: ProdMapper.fromDto(dto.prod),
      imposto: ImpostosMapper.fromDto(dto.imposto),
      impostoDevol: ImpostoDevolMapper.fromDto(dto.impostoDevol),
      infAdProd: dto.infAdProd,
      obsItem: ObsItemMapper.fromDto(dto.obsItem),
    });
  }
}