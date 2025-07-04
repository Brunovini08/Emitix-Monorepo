import { TTNSU } from "../../types/primitivies_types/TTNSU";
import { ConsNSU } from "../../values-objects/nfe-danfe/consNSU.vo";

export class ConsNSUMapper {
    static fromDto(data: TTNSU) {
        return new ConsNSU({
            NSU: String(data)
        })
    }
}