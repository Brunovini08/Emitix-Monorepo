import { COFINSNT } from "src/core/nfe/domain/values-objects/nfe-emitir/det/imposto/COFINS/cofinsNT.vo";
import type { cofinsNtDto } from "src/shared/common/dtos/infNfe/det/impostos/cofins/cofinsnt.dto";

export class COFINSNTMapper {
  static fromDto(dto: cofinsNtDto): COFINSNT {  
    return new COFINSNT({
      CST: dto.CST,
    });
  }
}