import { Impostos } from "src/core/nfe/domain/values-objects/det/imposto/imposto.vo";
import type { impostosDto } from "src/shared/common/dtos/infNfe/det/impostos/impostos.dto";
import { PISMapper } from "./PIS/PIS.mapper";
import { PISSTMapper } from "./PISST/pisst.mapper";
import { COFINSSTMapper } from "./COFINSST/cofinsst.mapper";
import { COFINSMapper } from "./COFINS/cofins.mapper";
import { ICMSUFDestMapper } from "./ICMSUFDest/icmsUfDest.mapper";
import { IIMapper } from "./II/II.mapper";
import { ISSQNMapper } from "./ISSQN/ISSQN.mapper";
import { ICMSMapper } from "./ICMS/ICMS.mapper";
import { IPIMapper } from "./IPI/ipi.mapper";
import { IBSCBSMapper } from "./IBSCBS/IBSCBS.mapper";

export class ImpostosMapper {
  static fromDto(dto: impostosDto): Impostos {

    return new Impostos({
      vTotTrib: dto.vTotTrib ? String(dto.vTotTrib) : undefined,
      ICMS: dto.ICMS ? ICMSMapper.fromDto(dto.ICMS) : undefined,
      IPI: dto.IPI ? IPIMapper.fromDto(dto.IPI) : undefined,
      II: dto.II ? IIMapper.fromDto(dto.II) : undefined,
      ISSQN: dto.ISSQN ? ISSQNMapper.fromDto(dto.ISSQN) : undefined,
      PIS: dto.PIS ? PISMapper.fromDto(dto.PIS) : undefined,
      PISST: dto.PISST ? PISSTMapper.fromDto(dto.PISST) : undefined,
      COFINS: dto.COFINS ? COFINSMapper.fromDto(dto.COFINS) : undefined,
      COFINSST: dto.COFINSST ? COFINSSTMapper.fromDto(dto.COFINSST) : undefined,
      ICMSUFDest: dto.ICMSUFDest ? ICMSUFDestMapper.fromDto(dto.ICMSUFDest) : undefined,
      IBSCBS: dto.IBSCBS ? IBSCBSMapper.fromDto(dto.IBSCBS) : undefined,
    });
  }
}