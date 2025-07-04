import { NfeConsultaEntity } from "../../entities/nfe-consulta.entity";
import TEnvConsSitNfe from "../../types/complex_types/TCons/TEnvConsSitNfe";

export class NfeConsultaMapper {
    static fromDto(data: TEnvConsSitNfe): NfeConsultaEntity {
        return new NfeConsultaEntity({
            chNFe: data.consSitNFe.chNFe,
            tpAmb: String(data.consSitNFe.tpAmb),
            versao: data.consSitNFe.versao,
            xServ: data.consSitNFe.xServ
        })
    }
}