import { Emit } from "../../values-objects/emit/emit.vo";
import type { emitDto } from "src/shared/common/dtos/infNfe/emit/emit.dto";
import { EnderecoMapper } from "./enderecoEmit.mapper";

export class EmitMapper {
  static fromDto(dto: emitDto): Emit {
    return new Emit({
      CNPJ: dto.CNPJ ? String(dto.CNPJ) : undefined,
      xNome: String(dto.xNome),
      xFant: dto.xFant ? String(dto.xFant) : undefined,
      enderEmit: EnderecoMapper.fromDto(dto.enderEmit),
      IE: String(dto.IE),
      IEST: dto.IEST ? String(dto.IEST) : undefined,
      IM: dto.IM ? String(dto.IM) : undefined,
      CNAE: dto.CNAE ? String(dto.CNAE) : undefined,
      CRT: String(dto.CRT),
    });
  }
}