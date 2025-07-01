import { II } from "src/core/nfe/domain/values-objects/det/imposto/II/II.vo";
import type { IIDto } from "src/shared/common/dtos/infNfe/det/impostos/II/II.dto";

export class IIMapper {
  static fromDto(dto: IIDto): II {
    return new II({
      vBC: Number(dto.vBC),
    });
  }
}