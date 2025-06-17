import { IPI } from "src/core/nfe/domain/values-objects/det/imposto/IPI/ipi.vo";
import { TIpi } from "src/core/nfe/domain/types/complex_types/TIpi/TIpi";
import { IPINTMapper } from "./ipint.mapper";

export class IPIMapper {
  static fromDto(dto: TIpi): IPI {
    return new IPI({
      CNPJProd: String(dto.CNPJProd),
      cSelo: String(dto.cSelo),
      qSelo: String(dto.qSelo),
      cEnq: String(dto.cEnq),
      IPITrib: dto.IPITrib,
      IPINT: IPINTMapper.fromDto(dto.IPINT),
    });
  }
}