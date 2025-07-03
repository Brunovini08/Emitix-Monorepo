
import { TChNFe } from "../../types/primitivies_types/TChNFe";
import { ConsChNFe } from "../../values-objects/nfe-danfe/consChNFe.vo";

export class ConsChNFeMapper {
    static fromDto(data: TChNFe): ConsChNFe {
        return new ConsChNFe({
            chNFe: String(data)
        })
    }
}