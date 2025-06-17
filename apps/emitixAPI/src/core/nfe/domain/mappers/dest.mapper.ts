import type { destDto } from "src/shared/common/dtos/infNfe/det/dest/dest.dto";
import { Dest } from "../values-objects/dest.vo";
import { EnderecoMapper } from "./endereco.mapper";

export class DestMapper {
  static fromDto(dto: destDto): Dest {
    return new Dest({
      CNPJ: String(dto.CNPJ),
      CPF: String(dto.CPF),
      idEstrangeiro: String(dto.idEstrangeiro),
      xNome: String(dto.xNome),
      enderDest: EnderecoMapper.fromDto(dto.enderDest),
      indIEDest: String(dto.indIEDest),
      IE: String(dto.IE),
      ISUF: String(dto.ISUF),
      IM: String(dto.IM),
      email: String(dto.email),
    });
  }
}