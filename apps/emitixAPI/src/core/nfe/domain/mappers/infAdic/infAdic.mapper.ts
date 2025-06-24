import { infAdicDto } from "src/shared/common/dtos/infNfe/infAdic/infAdic.dto";
import { infAdic } from "../../values-objects/infAdic/infAdic.vo";
import { ObsContMapper } from "./obsCont.mapper";
import { ObsFiscoMapper } from "../det/obsItem/obsFisco.mapper";
import { ProcRefMapper } from "./proceRef.mapper";

export class InfAdicMapper {
  static fromDto(dto: infAdicDto): infAdic {
    return new infAdic({
      infAdFisco: String(dto.infAdFisco),
      infCpl: String(dto.infCpl),
      obsCont: dto.obsCont.map(item => ObsContMapper.fromDto(item)),
      obsFisco: dto.obsFisco.map(item => ObsFiscoMapper.fromDto(item)),
      procRef: dto.procRef.map(item => ProcRefMapper.fromDto(item))
    })
  }
}