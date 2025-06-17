import { enderDto } from "../types/complex_types/TEnderEmi/ender.dto";
import { Endereco } from "../values-objects/emit/endereco.vo";

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
      cPais: String(dto.cPais),
      xPais: String(dto.xPais),
      fone: String(dto.fone),
      cpl: String(dto.xCpl),
    });
  }
}