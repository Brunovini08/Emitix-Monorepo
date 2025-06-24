import { procRefDto } from "src/shared/common/dtos/infNfe/infAdic/procRef.dto";
import { procRef } from "../../values-objects/infAdic/procRef.vo";

export class ProcRefMapper {
  static fromDto(dto: procRefDto): procRef {
    return new procRef({
      nProc: String(dto.nProc),
      indProc: String(dto.indProc),
      tpAto: String(dto.tpAto)
    })
  }
}