import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from "class-validator";
import { TInfEvento } from "./TInfEvento";

export class TEvento{
  @IsNotEmpty({
    message: 'O atributo versao deve ser informado'
  })
  versao: string

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() =>TInfEvento)
  infEvento: TInfEvento
}