import { Impostos } from "src/core/nfe/domain/values-objects/det/imposto/imposto.vo";
import type { impostosDto } from "src/shared/common/dtos/infNfe/det/impostos/impostos.dto";
import { ServicoMapper } from "./servico/servico.mapper";
import { ProdutoMapper } from "./produto/produto.mapper";
import { PISMapper } from "./PIS/PIS.mapper";
import { PISSTMapper } from "./PISST/pisst.mapper";
import { COFINSSTMapper } from "./COFINSST/cofinsst.mapper";
import { COFINSMapper } from "./COFINS/cofins.mapper";
import { ICMSUFDestMapper } from "./ICMSUFDest/icmsUfDest.mapper";

export class ImpostosMapper {
  static fromDto(dto: impostosDto): Impostos {

    return new Impostos({
      vTotTrib: dto.vTotTrib ? String(dto.vTotTrib) : undefined,
      produto: dto.produto ? ProdutoMapper.fromDto(dto.produto) : undefined,
      servico: dto.servico ? ServicoMapper.fromDto(dto.servico) : undefined,
      PIS: dto.PIS ? PISMapper.fromDto(dto.PIS) : undefined,
      PISST: dto.PISST ? PISSTMapper.fromDto(dto.PISST) : undefined,
      COFINS: dto.COFINS ? COFINSMapper.fromDto(dto.COFINS) : undefined,
      COFINSST: dto.COFINSST ? COFINSSTMapper.fromDto(dto.COFINSST) : undefined,
      ICMSUFDest: dto.ICMSUFDest ? ICMSUFDestMapper.fromDto(dto.ICMSUFDest) : undefined,
    });
  }
}