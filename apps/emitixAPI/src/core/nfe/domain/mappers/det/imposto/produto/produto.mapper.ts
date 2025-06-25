import { Produto } from "src/core/nfe/domain/values-objects/det/imposto/produto.vo";
import type { produtoDto } from "src/shared/common/dtos/infNfe/det/impostos/produto/produto.dto";
import { ICMSMapper } from "../ICMS/ICMS.mapper";
import { IPIMapper } from "../IPI/ipi.mapper";
import { IIMapper } from "../II/II.mapper";

export class ProdutoMapper {
  static fromDto(dto: produtoDto): Produto {
    return new Produto({
      ICMS: ICMSMapper.fromDto(dto.ICMS),
      IPI: dto.IPI ? IPIMapper.fromDto(dto.IPI) : undefined,
      II: dto.II ? IIMapper.fromDto(dto.II) : undefined,
    });
  }
}