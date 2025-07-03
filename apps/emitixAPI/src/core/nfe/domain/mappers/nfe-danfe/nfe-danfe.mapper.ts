import { NfeDanfeEntity } from "../../entities/nfe-danfe.entity";
import { TEnvDistDFeInt } from "../../types/complex_types/TDist/TEnvDistDFeInt";
import { ConsChNFeMapper } from "./consChNFe.mapper";
import { ConsNSUMapper } from "./consNSU.mapper";
import { DistNSUMapper } from "./distNSU.mapper";

export class NfeDanfeMapper {
    static fromDto(data: TEnvDistDFeInt): NfeDanfeEntity{
        return new NfeDanfeEntity({
           consChNFe: data?.distDFeInt?.consChNFe?.chNFe? ConsChNFeMapper.fromDto(data.distDFeInt.consChNFe.chNFe) : undefined,
           consNSU: data?.distDFeInt?.consNSU?.NSU? ConsNSUMapper.fromDto(data.distDFeInt.consNSU?.NSU) : undefined,
           distNSU: data?.distDFeInt?.distNSU?.ultNSU? DistNSUMapper.fromDto(data.distDFeInt.distNSU?.ultNSU) : undefined,
           tpAmb: String(data.distDFeInt.tpAmb),
           versao: String(data.distDFeInt.versao),
           CNPJ: data.distDFeInt.CNPJ ? String(data.distDFeInt.CNPJ) : undefined,
           CPF: data.distDFeInt.CPF? String(data.distDFeInt.CPF) : undefined,
           cUFAuto: data.distDFeInt.cUFAutor ? String(data.distDFeInt.cUFAutor) : undefined,
        })
    }
}