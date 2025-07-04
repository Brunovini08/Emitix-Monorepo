import { TTNSU } from "../../types/primitivies_types/TTNSU";
import { DistNSU } from "../../values-objects/nfe-danfe/distNSU.vo";

export class DistNSUMapper {
    static fromDto(data: TTNSU): DistNSU {
        return new DistNSU({
            ultNSU: String(data)
        })
    }
}