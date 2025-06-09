import { Type } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { TAmb } from "../../primitivies_types/TAmb";

export default class TConsStatServ {
  @IsNotEmpty({
    message: 'O elemento versao não pode estar vazio'
  })
  versao: string

  @IsNotEmpty({
    message: 'O elemento tpAmb não pode estar vazio'
  })
  @Type(() => TAmb)
  tpAmb: TAmb

  @IsNotEmpty({
    message: 'O elemento cUF não pode estar vazio'
  })
  cUF: string

  @IsNotEmpty({
    message: 'O elemento xServ não pode estar vazio'
  })
  @Length(6,6)
  xServ: string
}