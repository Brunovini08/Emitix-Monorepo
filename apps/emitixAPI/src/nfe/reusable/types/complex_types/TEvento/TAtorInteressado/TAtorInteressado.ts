import { Type } from "class-transformer";
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TCOrgaoIBGE } from "../../../primitivies_types/TCOrgaoIBGE";
import { TUf } from "../../../primitivies_types/TUf";

export class TAtorInteressado {
  @IsNotEmpty({
    message: 'O atributo versao é obrigatório'
  })
  versao: string

  @IsNotEmpty({
    message: 'O elemento descEvento é obrigatório'
  })
  descEvento: string

  @IsNotEmpty({
    message: 'O elemento cOrgaoAutor é obrigatório'
  })
  @Type(() => TUf)
  cOrgaoAutor: TUf

  @IsNotEmpty({
    message: 'O elemento tpAutor é obrigatório'
  })
  @IsIn(["1", "2", "3"], {
    message: 'tpAutor deve ter um dos seguintes valores: 1 - Empresa Emitente; 2 - Empresa Destinatária; 3 - Empresa Transportadora'
  })
  tpAutor: string

  @IsOptional()
  verAplic: string
}