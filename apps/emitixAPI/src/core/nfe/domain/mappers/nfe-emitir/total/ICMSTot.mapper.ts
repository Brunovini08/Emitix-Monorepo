import type { ICMSTotDto } from "src/shared/common/dtos/infNfe/total/ICMSTot/ICMSTot.dto";
import { ParserUtils } from "src/shared/common/utils/parser.utils";
import { ICMSTot } from "../../../values-objects/nfe-emitir/total/ICMSTot.vo";

export class ICMSTotMapper {
  static fromDto(dto: ICMSTotDto): ICMSTot {
    const vProd = ParserUtils.parseDecimal(dto.vProd);
    const vFrete = ParserUtils.parseDecimal(dto.vFrete);
    const vSeg = ParserUtils.parseDecimal(dto.vSeg);
    const vDesc = ParserUtils.parseDecimal(dto.vDesc);
    const vII = ParserUtils.parseDecimal(dto.vII);
    const vIPI = ParserUtils.parseDecimal(dto.vIPI);
    const vIPIDevol = ParserUtils.parseDecimal(dto.vIPIDevol);
    const vICMS = ParserUtils.parseDecimal(dto.vICMS);
    const vST = ParserUtils.parseDecimal(dto.vST);
    const vFCP = ParserUtils.parseDecimal(dto.vFCP);
    const vPIS = ParserUtils.parseDecimal(dto.vPIS);
    const vCOFINS = ParserUtils.parseDecimal(dto.vCOFINS);
    const vOutro = ParserUtils.parseDecimal(dto.vOutro);

    const vNF = vProd - vDesc + vFrete + vSeg + vOutro + vII + vIPI - vIPIDevol;

    return new ICMSTot({
      vBC: ParserUtils.parseDecimal(dto.vBC),
      vICMS: vICMS,
      vICMSDeson: ParserUtils.parseDecimal(dto.vICMSDeson),
      vFCPUFDest: ParserUtils.parseDecimalOptional(dto.vFCPUFDest),
      vICMSUFDest: ParserUtils.parseDecimalOptional(dto.vICMSUFDest),
      vICMSUFRemet: ParserUtils.parseDecimalOptional(dto.vICMSUFRemet),
      vFCP: vFCP,
      vBCST: ParserUtils.parseDecimal(dto.vBCST),
      vST: vST,
      vFCPST: ParserUtils.parseDecimal(dto.vFCPST),
      vFCPSTRet: ParserUtils.parseDecimal(dto.vFCPSTRet),
      qBCMono: ParserUtils.parseDecimalOptional(dto.qBCMono),
      vICMSMono: ParserUtils.parseDecimalOptional(dto.vICMSMono),
      qBCMonoReten: ParserUtils.parseDecimalOptional(dto.qBCMonoReten),
      vICMSMonoReten: ParserUtils.parseDecimalOptional(dto.vICMSMonoReten),
      qBCMonoRet: ParserUtils.parseDecimalOptional(dto.qBCMonoRet),
      vICMSMonoRet: ParserUtils.parseDecimalOptional(dto.vICMSMonoRet),
      vProd: vProd,
      vFrete: vFrete,
      vSeg: vSeg,
      vDesc: vDesc,
      vII: vII,
      vIPI: vIPI,
      vIPIDevol: vIPIDevol,
      vPIS: vPIS,
      vCOFINS: vCOFINS,
      vOutro: vOutro,
      vNF: vNF, // Usar o valor calculado
      vTotTrib: ParserUtils.parseDecimalOptional(dto.vTotTrib),
    });
  }
}