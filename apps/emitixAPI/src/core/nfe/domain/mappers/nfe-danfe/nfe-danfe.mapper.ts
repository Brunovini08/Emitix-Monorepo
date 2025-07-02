import { NfeDanfeEntity } from "../../entities/nfe-danfe.entity";
import { TEnvDistDFeInt } from "../../types/complex_types/TDist/TEnvDistDFeInt";
import { ConsChNFeMapper } from "./consChNFe.mapper";
import { ConsNSUMapper } from "./consNSU.mapper";
import { DistNSUMapper } from "./distNSU.mapper";

export class NfeDanfeMapper {
    static fromDto(data: TEnvDistDFeInt): NfeDanfeEntity{
        return new NfeDanfeEntity({
           consChNFe: ConsChNFeMapper.fromDto(data.distDFeInt.consChNFe.chNFe),
           consNSU: ConsNSUMapper.fromDto(data.distDFeInt.consNSU.ultNSU),
           distNSU: DistNSUMapper.fromDto(data.distDFeInt.distNSU.ultNSU),
           tpAmb: String(data.distDFeInt.tpAmb),
           versao: String(data.distDFeInt.versao),
           CNPJ: data.distDFeInt.CNPJ ? String(data.distDFeInt.CNPJ) : undefined,
           CPF: data.distDFeInt.CPF? String(data.distDFeInt.CPF) : undefined,
           cUFAuto: data.distDFeInt.cUFAutor ? String(data.distDFeInt.cUFAutor) : undefined,
        })
    }
}