import { Emit } from "../values-objects/emit/emit.vo";
import type { emitDto } from "src/shared/common/dtos/infNfe/emit/emit.dto";
import { EnderecoMapper } from "./endereco.mapper";

export class EmitMapper {
  static fromDto(dto: emitDto): Emit {
    return new Emit({
      CNPJ: String(dto.CNPJ),
      xNome: String(dto.xNome),
      xFant: String(dto.xFant),
      enderEmit: EnderecoMapper.fromDto(dto.enderEmit),
      IE: String(dto.IE),
      IEST: String(dto.IEST),
      IM: String(dto.IM),
      CNAE: String(dto.CNAE),
      CRT: String(dto.CRT),
    });
  }
}