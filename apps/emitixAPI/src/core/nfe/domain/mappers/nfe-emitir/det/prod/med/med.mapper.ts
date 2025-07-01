import{ Med } from "src/core/nfe/domain/values-objects/nfe-emitir/det/prod/med.vo";
import { medDto } from "src/shared/common/dtos/infNfe/det/prod/med/med.dto";

export class MedMapper {
  static fromDto(dto: medDto): Med {
    return new Med({
      cProdANVISA: String(dto.cProdANVISA),
      xMotivoIsencao: String(dto.xMotivoIsencao),
      vPMC: Number(dto.vPMC),
    });
  }
}