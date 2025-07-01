import { VeicProd } from "src/core/nfe/domain/values-objects/nfe-emitir/det/prod/veicProd.vo";
import type { veicProdDto } from "src/shared/common/dtos/infNfe/det/prod/veicProd/veicProd.dto";

export class VeicProdMapper {
  static fromDto(dto: veicProdDto): VeicProd {
    return new VeicProd({
      tpOp: String(dto.tpOp),
      chassi: String(dto.chassi),
      cCor: String(dto.cCor),
      xCor: String(dto.xCor),
      pot: Number(dto.pot),
      cilin: String(dto.cilin),
      pesoL: String(dto.pesoL),
      pesoB: String(dto.pesoB),
      nSerie: String(dto.nSerie),
      tpComb: String(dto.tpComb),
      nMotor: String(dto.nMotor),
      CMT: String(dto.CMT),
      dist: String(dto.dist),
      anoMod: String(dto.anoMod),
      tpPint: String(dto.tpPint),
      tpVeic: String(dto.tpVeic),
      espVeic: String(dto.espVeic),
      VIN: String(dto.VIN),
      tpRest: String(dto.tpRest),
      anoFab: String(dto.anoFab),
      cCorDENATRAN: String(dto.cCorDENATRAN),
      cMod: String(dto.cMod),
      condVeic: String(dto.condVeic),
      lota: String(dto.lota),
    });
  }
}