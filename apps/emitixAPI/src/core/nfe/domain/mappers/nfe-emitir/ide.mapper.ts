import type { ideDto } from "src/shared/common/dtos/infNfe/ide/ide.dto";
import { Ide } from "../../values-objects/ide/ide.vo";

export class IdeMapper {
  static fromDto(dto: ideDto): Ide {
    return new Ide({
      cUF: String(dto.cUF),
      natOp: String(dto.natOp),
      mod: String(dto.mod),
      serie: String(dto.serie),
      nNF: String(dto.nNF),
      dhEmi: String(dto.dhEmi),
      tpNF: String(dto.tpNF),
      idDest: String(dto.idDest),
      cMunFG: String(dto.cMunFG),
      tpImp: String(dto.tpImp),
      tpEmis: String(dto.tpEmis),
      tpAmb: String(dto.tpAmb),
      finNFe: String(dto.finNFe),
      indFinal: String(dto.indFinal),
      indPres: String(dto.indPres),
      procEmi: String(dto.procEmi),
      verProc: String(dto.verProc),
      dhSaiEnt: dto.dhSaiEnt ? String(dto.dhSaiEnt) : undefined,
      dhCont: dto.dhCont ? String(dto.dhCont) : undefined,
      xJust: dto.xJust ? String(dto.xJust) : undefined,
      cDV: String(dto.cDV) || '',
    });
  }
}