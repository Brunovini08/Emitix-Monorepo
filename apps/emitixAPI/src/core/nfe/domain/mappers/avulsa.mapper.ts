import type { avulsaDto } from "src/shared/common/dtos/infNfe/avulsa/avulsa.dto";
import { Avulsa } from "../values-objects/avulsa.vo";

export class AvulsaMapper {
  static fromDto(dto: avulsaDto): Avulsa {
    return new Avulsa({
      CNPJ: String(dto.CNPJ),
      xOrgao: String(dto.xOrgao),
      matr: String(dto.matr),
      xAgente: String(dto.xAgente),
      fone: String(dto.fone),
      UF: String(dto.UF),
      nDAR: String(dto.nDAR),
      dEmiDAR: new Date(dto.dEmi.toString()),
      vDAR: Number(dto.vDAR),
      repEmi: String(dto.repEmi),
    });
  }
}