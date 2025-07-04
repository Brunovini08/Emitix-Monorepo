import { infAdicDto } from "src/shared/common/dtos/infNfe/infAdic/infAdic.dto";
import { ObsContMapper } from "./obsCont.mapper";
import { ObsFiscoMapper } from "../det/obsItem/obsFisco.mapper";
import { ProcRefMapper } from "./proceRef.mapper";
import { infAdic } from "../../../values-objects/nfe-emitir/infAdic/infAdic.vo";

export class InfAdicMapper {
  static fromDto(dto: infAdicDto): infAdic {
    return new infAdic({
      infAdFisco: dto.infAdFisco ? String(dto.infAdFisco) : undefined,
      infCpl: dto.infCpl ? String(dto.infCpl) : undefined,
      obsCont: dto.obsCont ? dto.obsCont.map(item => ObsContMapper.fromDto(item)) : undefined,
      obsFisco: dto.obsFisco ? dto.obsFisco.map(item => ObsFiscoMapper.fromDto(item)) : undefined,
      procRef: dto.procRef ? dto.procRef.map(item => ProcRefMapper.fromDto(item)) : undefined
    })
  }
}