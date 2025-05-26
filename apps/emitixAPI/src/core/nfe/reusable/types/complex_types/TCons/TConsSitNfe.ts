import { IsNotEmpty } from "class-validator";
import { TAmb } from "../../primitivies_types/TAmb";
import { Type } from "class-transformer";
import { TUf } from "../../primitivies_types/TUf";

export default class TConsSitNfe {
  @IsNotEmpty({
    message: 'O elemento versao não pode ser vazio'
  })
  versao: string;

  @IsNotEmpty({
    message: 'O elemento tpAmb não pode ser vazio'
  })
  @Type(() => TAmb)
  tpAmb: TAmb;

  @IsNotEmpty({
    message: 'O elemento xServ não pode ser vazio'
  })
  xServ: string;

  @IsNotEmpty({
    message: 'O elemento chNFe não pode ser vazio'
  })
  chNFe: string;

  @IsNotEmpty({
    message: 'O elemento uf não pode ser vazio'
  })
  @Type(() => TUf)
  uf: TUf;
}