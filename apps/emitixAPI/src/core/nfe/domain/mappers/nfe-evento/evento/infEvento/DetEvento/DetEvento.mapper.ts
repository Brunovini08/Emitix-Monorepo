import { DetEventos } from "src/core/nfe/domain/types/complex_types/TEvento/detEventos";
import { DetEvento } from "src/core/nfe/domain/values-objects/nfe-evento/evento/infEvento/detEvento/detEvento.vo";
import { TAtorInteressadoMapper } from "./TAtorInteressado.mapper";
import { TCancelamentoMapper } from "./TCancelamento.mapper";
import { TCartaCorrecaoMapper } from "./TCartaCorrecao.mapper";
import { TEpecMapper } from "./TEpec/TEpec.mapper";
import { TMani_DestMapper } from "./TMani_Dest.mapper";
import { TPedido_ProrrogMapper } from "./TPedido_Prorrog/TPedido_Prorrog.mapper";

export class DetEventoMapper {
  static fromDto(data: DetEventos): DetEvento {
    return new DetEvento({
        TAtorinteressado: data.TAtorInteressado ? TAtorInteressadoMapper.fromDto(data.TAtorInteressado) : undefined,
        TCancelamento: data.TCancelamento ? TCancelamentoMapper.fromDto(data.TCancelamento) : undefined,
        TCartaCorrecao: data.TCarta_Correcao ? TCartaCorrecaoMapper.fromDto(data.TCarta_Correcao) : undefined,
        TEpec: data.TEpec ? TEpecMapper.fromDto(data.TEpec) : undefined,
        TMani_Dest: data.TMani_Dest ? TMani_DestMapper.fromDto(data.TMani_Dest) : undefined,
        TPedido_Prorrog: data.TPedido_Prorrog ? TPedido_ProrrogMapper.fromDto(data.TPedido_Prorrog) : undefined,
    })
  }
}