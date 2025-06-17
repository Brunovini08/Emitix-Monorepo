import type { transpDto } from "src/shared/common/dtos/infNfe/transp/transp.dto";
import { transp } from "../values-objects/Transp/transp.vo";

export class TranspMapper {
  static fromDto(dto: transpDto): transp { 
    return new transp({
      modFrete: dto.modFrete,
      transporta: TransportaMapper.fromDto(dto.transporta),
      retTrasp: RetTranspMapper.fromDto(dto.retTrasp),
      veicTransp: VeiculoComReboqueMapper.fromDto(dto.veicTransp),
      reboque: VeiculoComReboqueMapper.fromDto(dto.reboque),
      vagao: dto.vagao,
      balsa: dto.balsa,
      vol: dto.vol,
    });
  }
}