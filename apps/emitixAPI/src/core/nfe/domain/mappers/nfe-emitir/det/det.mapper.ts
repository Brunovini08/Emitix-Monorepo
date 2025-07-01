import type { detDto } from "src/shared/common/dtos/infNfe/det/det.dto";
import { ProdMapper } from "./prod/ProdMapper";
import { ImpostosMapper } from "./imposto/imposto.mapper";
import { ImpostoDevolMapper } from "./impostoDevol/impostoDevol.mapper";
import { ObsItemMapper } from "./obsItem/obsItem.mapper";
import { Det } from "../../../values-objects/det/det.vo";

export class DetMapper {
  static fromDto(dto: detDto): Det {
    return new Det({
      prod: ProdMapper.fromDto(dto.prod),
      imposto: ImpostosMapper.fromDto(dto.imposto),
      impostoDevol: dto.impostoDevol ? ImpostoDevolMapper.fromDto(dto.impostoDevol) : undefined,
      infAdProd: dto.infAdProd ? String(dto.infAdProd) : undefined,
      obsItem: dto.obsItem ? ObsItemMapper.fromDto(dto.obsItem) : undefined,
    });
  }
}