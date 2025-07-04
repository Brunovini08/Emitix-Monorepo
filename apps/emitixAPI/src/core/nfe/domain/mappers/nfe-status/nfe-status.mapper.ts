import { NfeConsultaStatusEntity } from "../../entities/nfe-status.entity";
import TEnvConsStatServ from "../../types/complex_types/TCons/TEnvConsStatServ";

export class NfeStatusMapper {
    static fromDto(data: TEnvConsStatServ): NfeConsultaStatusEntity {
        return new NfeConsultaStatusEntity({
            cUF: String(data.consStatServ.cUF),
            versao: String(data.consStatServ.versao),
            tpAmb: String(data.consStatServ.tpAmb),
            xServ: String(data.consStatServ.xServ)
        })
    }
}