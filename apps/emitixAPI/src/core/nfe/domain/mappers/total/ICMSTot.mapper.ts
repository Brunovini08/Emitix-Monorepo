import type { ICMSTotDto } from "src/shared/common/dtos/infNfe/total/ICMSTot/ICMSTot.dto";
import { ICMSTot } from "../../values-objects/total/ICMSTot.vo";

export class ICMSTotMapper {
  static fromDto(dto: ICMSTotDto): ICMSTot {
    return new ICMSTot({
      vBC: dto.vBC,
      vICMS: dto.vICMS,
      vICMSDeson: dto.vICMSDeson,
      vBCST: dto.vBCST,
      vST: dto.vST,
      vProd: dto.vProd,
      vFrete: dto.vFrete,
      vSeg: dto.vSeg,
      vDesc: dto.vDesc,
      vII: dto.vII,
      vIPI: dto.vIPI,
      vIPIDevol: dto.vIPIDevol,
      vPIS: dto.vPIS,
      vCOFINS: dto.vCOFINS,
      vOutro: dto.vOutro,
      vNF: dto.vNF,
      vFCPUFDest: dto.vFCPUFDest,
      vICMSUFDest: dto.vICMSUFDest,
      vICMSUFRemet: dto.vICMSUFRemet,
      qBCMono: dto.qBCMono,
      vICMSMono: dto.vICMSMono,
      qBCMonoReten: dto.qBCMonoReten,
      vICMSMonoReten: dto.vICMSMonoReten,
      qBCMonoRet: dto.qBCMonoRet,
      vICMSMonoRet: dto.vICMSMonoRet,
      vTotTrib: dto.vTotTrib,
      vFCP: dto.vFCP,
      vFCPST: dto.vFCPST,
      vFCPSTRet: dto.vFCPSTRet,
    });
  }
}