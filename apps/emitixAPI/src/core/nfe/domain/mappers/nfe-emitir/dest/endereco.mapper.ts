
import { Endereco } from "src/core/nfe/domain/values-objects/nfe-emitir/dest/enderDest.vo";
import type { enderDto } from "../../../types/complex_types/TEnderEmi/ender.dto";

export class EnderecoMapper {
  static fromDto(dto: enderDto): Endereco {
    return new Endereco({
      xLgr: String(dto.xLgr),
      nro: String(dto.nro),
      xBairro: String(dto.xBairro),
      cMun: String(dto.cMun),
      xMun: String(dto.xMun),
      UF: String(dto.UF),
      CEP: String(dto.CEP),
      cPais: dto.cPais ? String(dto.cPais) : undefined,
      xPais: dto.xPais ? String(dto.xPais) : undefined,
      fone: dto.fone ? String(dto.fone) : undefined,
      xCpl: dto.xCpl ? String(dto.xCpl) : undefined,
    });
  }
}