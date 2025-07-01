import { InutNFe } from "../../entities/nfe-inutilizar.entity";
import type TInutNFe from "../../types/complex_types/TInut/TInutNfe";


export class NfeInutilizarMapper {
  static fromDto(dto: TInutNFe): InutNFe {
    return new InutNFe({
      tpAmb: String(dto.tpAmb),
      xServ: String(dto.xServ),
      cUF: String(dto.cUF),
      ano: String(dto.ano),
      CNPJ: String(dto.CNPJ),
      mod: String(dto.mod),
      serie: String(dto.serie),
      nNFIni: String(dto.nNFIni),
      nNFFin: String(dto.nNFFin),
      xJust: String(dto.xJust)
    })
  }
}