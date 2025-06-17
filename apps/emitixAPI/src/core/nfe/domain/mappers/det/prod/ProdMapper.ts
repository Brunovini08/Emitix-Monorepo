import type { prodDto } from "src/shared/common/dtos/infNfe/det/prod/prod.dto";
import { Prod } from "../../../values-objects/det/prod/prod.vo";
import { DetExportMapper } from "./detExport/detExport.mapper";
import { GCredMapper } from "./gCred.mapper";
import { InfProdEmbMapper } from "./infProdEmb/infProdEmb.mapper";
import { InfProdNFFMapper } from "./infProdNFF/infProdNFF.mapper";
import { RastroMapper } from "./rastro/rastro.mapper";
import { VeicProdMapper } from "./veicProd/veicProd.mapper";
import { MedMapper } from "./med/med.mapper";
import { ArmaMapper } from "./arma/arma.mapper";
import { CombMapper } from "./comb/comb.mapper";


export class ProdMapper {
  static fromDto(dto: prodDto): Prod {
    return new Prod({
      cEAN: String(dto.cEAN),
      cEANTrib: String(dto.cEANTrib),
      CFOP: String(dto.CFOP),
      cProd: String(dto.cProd),
      NCM: String(dto.NCM),
      qCom: Number(dto.qCom),
      vUnCom: Number(dto.vUnCom),
      vProd: Number(dto.vProd),
      xProd: String(dto.xProd),
      uCom: String(dto.uCom),
      indTot: String(dto.indTot),
      detExport: dto.detExport ? DetExportMapper.fromDto(dto.detExport) : undefined,
      gCred: dto.gCred ? dto.gCred.map((gCred) => GCredMapper.fromDto(gCred)) : [],
      EXTIPI: String(dto.EXTIPI),
      cBarraTrib: String(dto.cBarraTrib),
      uTrib: String(dto.uTrib),
      qTrib: Number(dto.qTrib),
      vUnTrib: Number(dto.vUnTrib),
      vFrete: Number(dto.vFrete),
      vSeg: Number(dto.vSeg),
      vDesc: Number(dto.vDesc),
      vOutro: Number(dto.vOutro),
      infProdEmb: dto.infProdEmb ? InfProdEmbMapper.fromDto(dto.infProdEmb) : undefined,
      infProdNFF: dto.infProdNFF ? InfProdNFFMapper.fromDto(dto.infProdNFF) : undefined,
      rastro: dto.rastro ? dto.rastro.map((rastro) => RastroMapper.fromDto(rastro)) : [],
      veicProd: dto.veicProd ? VeicProdMapper.fromDto(dto.veicProd) : undefined,
      med: dto.med ? MedMapper.fromDto(dto.med) : undefined,
      arma: dto.arma ? dto.arma.map((arma) => ArmaMapper.fromDto(arma)) : [],
      comb: dto.comb ? CombMapper.fromDto(dto.comb) : undefined,
      xPed: String(dto.xPed),
      nItemPed: String(dto.nItemPed),
    });
  }
}
