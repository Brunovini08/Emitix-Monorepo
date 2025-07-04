import { NFeEventoEntity } from "../../../entities/nfe-evento.entity";
import { TEnvEvento } from "../../../types/complex_types/TEvento/TEnvEvento";
import { InfEventoMapper } from "./infEvento/infEvento.mapper";

export class EventoMapper {
    static fromDto(data: TEnvEvento): NFeEventoEntity {
        return new NFeEventoEntity({
            versao: String(data.envEvento.versao),
            infEvento: InfEventoMapper.fromDto(data.envEvento.evento.infEvento),
            chaveAcesso: String(data.envEvento.evento.infEvento.chNFe)
        })
    }
}