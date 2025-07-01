import { ConsultaProcessamentoNfeEntity } from "../../entities/consultaProcessamentoNfe.entity";
import type { TConsReciNFe } from "../../types/complex_types/TCons/TConsReciNFe";
import type { TEnviConsReciNFe } from "../../types/complex_types/TCons/TEnviConsReciNFe";

export class ConsultaProcessamentoMapper {
  static fromDto(dto: TEnviConsReciNFe): ConsultaProcessamentoNfeEntity {
    return new ConsultaProcessamentoNfeEntity({
      nReq: String(dto.consReciNFe.nRec),
      tpAmb: dto.consReciNFe.tpAmb,
      versao: String(dto.consReciNFe.versao || "4.00"),
      cnpj: String(dto.cnpj),
      uf: String(dto.uf),
    })
  }
}