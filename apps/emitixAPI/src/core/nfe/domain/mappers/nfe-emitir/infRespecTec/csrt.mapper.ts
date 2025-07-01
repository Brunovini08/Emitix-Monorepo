import type { CSRTDTo } from "../../types/complex_types/TInfRespTec/CSRT.dto";
import { CSRT } from "../../values-objects/infRespecTec/CSRT.vo";

export class CSRTMapper {
  static fromDto(dto: CSRTDTo): CSRT {
    return new CSRT({
      idCSRT: String(dto.idCSRT),
      hashCSRT: String(dto.hashCSRT)
    })
  }
}