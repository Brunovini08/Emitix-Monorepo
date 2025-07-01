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
import { ParserUtils } from "src/shared/common/utils/parser.utils";

export class ProdMapper {
  static fromDto(dto: prodDto): Prod {
    return new Prod({
      cProd: ParserUtils.parseString(dto.cProd),
      cEAN: ParserUtils.parseString(dto.cEAN),
      cBarra: dto.cBarra ? ParserUtils.parseString(dto.cBarra) : undefined,
      cEANTrib: ParserUtils.parseString(dto.cEANTrib),
      CFOP: ParserUtils.parseString(dto.CFOP),
      NCM: ParserUtils.parseString(dto.NCM),
      NVE: dto.NVE,
      CEST: dto.CEST,
      indEscala: dto.indEscala,
      CNPJFab: dto.CNPJFab?.cnpj,
      cBenef: dto.cBenef,
      qCom: ParserUtils.parseDecimal(dto.qCom),
      vUnCom: ParserUtils.parseDecimal(dto.vUnCom),
      vProd: ParserUtils.parseDecimal(dto.vProd),
      xProd: ParserUtils.parseString(dto.xProd),
      uCom: ParserUtils.parseString(dto.uCom),
      indTot: ParserUtils.parseString(dto.indTot),
      detExport: dto.detExport ? [DetExportMapper.fromDto(dto.detExport)] : undefined,
      gCred: dto.gCred ? dto.gCred.map((gCred) => GCredMapper.fromDto(gCred)) : undefined,
      EXTIPI: dto.EXTIPI ? ParserUtils.parseString(dto.EXTIPI) : undefined,
      cBarraTrib: dto.cBarraTrib ? ParserUtils.parseString(dto.cBarraTrib) : undefined,
      uTrib: ParserUtils.parseString(dto.uTrib),
      qTrib: ParserUtils.parseDecimal(dto.qTrib),
      vUnTrib: ParserUtils.parseDecimal(dto.vUnTrib),
      vFrete: dto.vFrete ? ParserUtils.parseDecimal(dto.vFrete) : undefined,
      vSeg: dto.vSeg ? ParserUtils.parseDecimal(dto.vSeg) : undefined,
      vDesc: dto.vDesc ? ParserUtils.parseDecimal(dto.vDesc) : undefined,
      vOutro: dto.vOutro ? ParserUtils.parseDecimal(dto.vOutro) : undefined,
      infProdEmb: dto.infProdEmb ? InfProdEmbMapper.fromDto(dto.infProdEmb) : undefined,
      infProdNFF: dto.infProdNFF ? InfProdNFFMapper.fromDto(dto.infProdNFF) : undefined,
      rastro: dto.rastro ? dto.rastro.map((rastro) => RastroMapper.fromDto(rastro)) : undefined,
      veicProd: dto.veicProd ? VeicProdMapper.fromDto(dto.veicProd) : undefined,
      med: dto.med ? MedMapper.fromDto(dto.med) : undefined,
      arma: dto.arma ? dto.arma.map((arma) => ArmaMapper.fromDto(arma)) : undefined,
      comb: dto.comb ? [CombMapper.fromDto(dto.comb)] : undefined,
      xPed: dto.xPed ? ParserUtils.parseString(dto.xPed) : undefined,
      nItemPed: dto.nItemPed ? ParserUtils.parseString(dto.nItemPed) : undefined,
      nFCI: dto.nFCI ? ParserUtils.parseString(dto.nFCI) : undefined,
      nRECOPI: dto.nRECOPI ? ParserUtils.parseString(dto.nRECOPI) : undefined,
    });
  }
}
