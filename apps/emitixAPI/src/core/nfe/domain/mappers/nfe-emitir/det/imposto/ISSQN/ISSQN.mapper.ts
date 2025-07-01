import { ISSQN } from "src/core/nfe/domain/values-objects/nfe-emitir/det/imposto/ISSQN/ISSQN.vo";
import type { ISSQNDto } from "src/shared/common/dtos/infNfe/det/impostos/servico/ISSQN.dto";

export class ISSQNMapper {
  static fromDto(dto: ISSQNDto): ISSQN {
    return new ISSQN({
      vBC: Number(dto.vBC),
      vAliq: Number(dto.vAliq),
      vISSQN: Number(dto.vISSQN),
      cMunFG: String(dto.cMunFG),
      cListServ: String(dto.cListServ),
      vDeducao: Number(dto.vDeducao),
      vOutro: Number(dto.vOutro),
      vDescIncond: Number(dto.vDescIncond),
      vDescCond: Number(dto.vDescCond),
      vISSRet: Number(dto.vISSRet),
      indISS: String(dto.indISS),
      cServico: String(dto.cServico),
      cMun: String(dto.cMun),
      cPais: String(dto.cPais),
      nProcesso: String(dto.nProcesso),
      indIncentivo: String(dto.indIncentivo),
    });
  }
}