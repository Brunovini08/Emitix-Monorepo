import { TDest } from "src/core/nfe/domain/types/complex_types/TEvento/TEpec/TDest";
import { TDestVO } from "src/core/nfe/domain/values-objects/nfe-evento/evento/infEvento/detEvento/TEpec/TDest.vo";

export class DestMapper {
    static fromDto(data: TDest): TDestVO {
        return new TDestVO({
            UF: String(data.UF),
            vICMS: String(data.vICMS),
            vNF: String(data.vNF),
            vST: String(data.vST),
            CNPJ: data.CNPJ? String(data.CNPJ) : undefined,
            CPF: data.CPF? String(data.CPF) : undefined,
            idEstrangeiro: data.idEstrangeiro? String(data.idEstrangeiro) : undefined,
            IE: data.IE? String(data.IE) : undefined
        })
    }
}