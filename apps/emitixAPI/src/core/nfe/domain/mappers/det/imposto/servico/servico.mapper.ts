import { Servico } from "src/core/nfe/domain/values-objects/det/imposto/servico.vo";
import type { servicoDto } from "src/shared/common/dtos/infNfe/det/impostos/servico/servico.dto";
import { IPIMapper } from "../IPI/ipi.mapper";
import { ISSQNMapper } from "../ISSQN/ISSQN.mapper";

export class ServicoMapper {
  static fromDto(dto: servicoDto): Servico {
    return new Servico({
      IPI: IPIMapper.fromDto(dto.IPI),
      ISSQN: ISSQNMapper.fromDto(dto.ISSQN),
    });
  }
}