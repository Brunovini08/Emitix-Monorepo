import { COFINS } from "src/core/nfe/domain/values-objects/det/imposto/COFINS/cofins.vo";
import type { cofinsDto } from "src/shared/common/dtos/infNfe/det/impostos/cofins/confins.dto";
import { COFINSAliqMapper } from "./cofinsAliq.mapper";
import { COFINSQtdeMapper } from "./cofinsQtde.mapper";
import { COFINSNTMapper } from "./cofinsNT.mapper";
import { COFINSOutrMapper } from "./cofinsOutr/cofinsOutr.mapper";

export class COFINSMapper {
  static fromDto(dto: cofinsDto): COFINS {
    return new COFINS({
      COFINSAliq: dto.COFINSAliq ? COFINSAliqMapper.fromDto(dto.COFINSAliq) : undefined,
      COFINSQtde: dto.COFINSQtde ? COFINSQtdeMapper.fromDto(dto.COFINSQtde) : undefined,
      COFINSNT: dto.COFINSNT ? COFINSNTMapper.fromDto(dto.COFINSNT) : undefined,
      COFINSOutr: dto.COFINSOutr ? COFINSOutrMapper.fromDto(dto.COFINSOutr) : undefined,
    });
  }
}