import type { destDto } from "src/shared/common/dtos/infNfe/det/dest/dest.dto";
import { EnderecoMapper } from "./endereco.mapper";
import { Dest } from "../../../values-objects/nfe-emitir/dest/dest.vo";

export class DestMapper {
  static fromDto(dto: destDto): Dest {
    return new Dest({
      CNPJ: dto.CNPJ ? String(dto.CNPJ) : undefined,
      CPF: dto.CPF ? String(dto.CPF) : undefined,
      idEstrangeiro: dto.idEstrangeiro ? String(dto.idEstrangeiro) : undefined,
      xNome: dto.xNome ? String(dto.xNome) : undefined,
      enderDest: dto.enderDest ? EnderecoMapper.fromDto(dto.enderDest) : undefined,
      indIEDest: String(dto.indIEDest),
      IE: dto.IE ? String(dto.IE) : undefined,
      ISUF: dto.ISUF ? String(dto.ISUF) : undefined,
      IM: dto.IM ? String(dto.IM) : undefined,
      email: dto.email ? String(dto.email) : undefined,
    });
  }
}