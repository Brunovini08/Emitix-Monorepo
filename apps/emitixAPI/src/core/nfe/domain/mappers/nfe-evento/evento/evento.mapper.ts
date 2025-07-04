import { TEvento } from "../../../types/complex_types/TEvento/TEvento";
import { EventoVO } from "../../../values-objects/nfe-evento/evento/evento.vo";
import { InfEventoMapper } from "./infEvento/infEvento.mapper";

export class EventoMapper {
    static fromDto(data: TEvento): EventoVO {
        return new EventoVO({
            versao: String(data.versao),
            infEvento: InfEventoMapper.fromDto(data.infEvento),
        })
    }
}