import type { transpDto } from "src/shared/common/dtos/infNfe/transp/transp.dto";
import { transp } from "../../values-objects/transp/transp.vo";
import { TransportaMapper } from "./transporta.mapper";
import { RetTranspMapper } from "./retTransp.mapper";
import { VeiculoComReboqueMapper } from "./VeiculoComReboque.mapper";
import { VeicTranspMapper } from "./veicTransp.mapper";
import { volMapper } from "./vol/vol.mapper";

export class TranspMapper {
  static fromDto(dto: transpDto): transp { 
    return new transp({
      modFrete: dto.modFrete,
      transporta: TransportaMapper.fromDto(dto.transporta),
      retTrasp: RetTranspMapper.fromDto(dto.retTrasp),
      veicTransp: VeicTranspMapper.fromDto(dto.veicTransp),
      reboque: VeiculoComReboqueMapper.fromDto(dto.reboque),
      vagao: String(dto.vagao),
      balsa: String(dto.balsa),
      vol: dto.vol.map((volItem) => volMapper.fromDto(volItem))
    });
  }
}