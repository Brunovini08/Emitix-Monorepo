import { Impostos } from "src/core/nfe/domain/values-objects/det/imposto/imposto.vo";
import type { impostosDto } from "src/shared/common/dtos/infNfe/det/impostos/impostos.dto";
import { ServicoMapper } from "./servico/servico.mapper";
import { ProdutoMapper } from "./produto/produto.mapper";

export class ImpostosMapper {
  static fromDto(dto: impostosDto): Impostos {
    return new Impostos({
      vTotTrib: Number(dto.vTotTrib),
      produto: ProdutoMapper.fromDto(dto.produto),
      servico: ServicoMapper.fromDto(dto.servico),
      PIS: PISMapper.fromDto(dto.PIS),
      PISST: PISSTMapper.fromDto(dto.PISST),
      COFINS: COFINSMapper.fromDto(dto.COFINS),
      COFINSST: COFINSSTMapper.fromDto(dto.COFINSST),
      ICMSUFDest: ICMSUFDestMapper.fromDto(dto.ICMSUFDest),
    });
  }
}