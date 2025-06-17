import { Ide } from "../values-objects/ide.vo";
import type { ideDto } from "src/shared/common/dtos/infNfe/ide/ide.dto";

export class IdeMapper {
  static fromDto(dto: ideDto): Ide {
    return new Ide({
      cUF: String(dto.cUF),
      cNF: String(dto.cNF),
      natOp: String(dto.natOp),
      mod: String(dto.mod),
      serie: String(dto.serie),
      nNF: String(dto.nNF),
      dhEmi: new Date(dto.dhEmi.toString()),
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
      dhSaiEnt: new Date(dto.dhSaiEnt.toString()),
      dhCont: new Date(dto.dhCont.toString()),
      xJust: String(dto.xJust),
    });
  }
}