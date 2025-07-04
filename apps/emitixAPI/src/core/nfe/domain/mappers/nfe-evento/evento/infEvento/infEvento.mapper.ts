import { TInfEvento } from "src/core/nfe/domain/types/complex_types/TEvento/TInfEvento";
import { InfEventoVO } from "src/core/nfe/domain/values-objects/nfe-evento/evento/infEvento/infEvento.vo";
import { DetEventoMapper } from "./DetEvento/DetEvento.mapper";

export class InfEventoMapper {
  static fromDto(data: TInfEvento): InfEventoVO {
    return new InfEventoVO({
      cOrgao: String(data.cOrgao),
      tpAmb: String(data.tpAmb),
      tpEvento: data.tpEvento,
      nSeqEvento: data.nSeqEvento,
      chNFe: String(data.chNFe),
      dhEvento: String(data.dhEvento),
      detEvento: DetEventoMapper.fromDto(data.detEvento),
      verEvento: String(data.verEvento),
      CNPJ: data.CNPJ ? String(data.CNPJ) : undefined,
      CPF: data.CPF? String(data.CPF) : undefined,
    })
  }
}