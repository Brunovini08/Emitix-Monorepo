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
      transporta: dto.transporta ? TransportaMapper.fromDto(dto.transporta) : undefined,
      retTrasp: dto.retTrasp ? RetTranspMapper.fromDto(dto.retTrasp) : undefined,
      veicTransp: dto.veicTransp ? VeicTranspMapper.fromDto(dto.veicTransp) : undefined,
      reboque: dto.reboque ? dto.reboque.map(item => VeiculoComReboqueMapper.fromDto(item)) : undefined,
      vagao: dto.vagao ? String(dto.vagao) : undefined,
      balsa: dto.balsa ? String(dto.balsa) : undefined,
      vol: dto.vol ? dto.vol.map((volItem) => volMapper.fromDto(volItem)) : undefined,
    });
  }
}