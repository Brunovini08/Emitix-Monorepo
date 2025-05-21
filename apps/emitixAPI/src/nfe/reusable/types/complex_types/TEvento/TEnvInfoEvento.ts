import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from "class-validator";
import { TEvento } from "./TEvento";
import { TCodUfIBGE } from "../../primitivies_types/TCodUfIBGE";

export class TEnvInfoEvento {
  @IsNotEmpty({
    message: 'O atributo versao é obrigatório'
  })
  versao: string

  @IsNotEmpty({
    message: 'O elemento uf é obrigatório'
  })
  @Type(() => TCodUfIBGE)
  uf:TCodUfIBGE
  
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => TEvento)
  evento!: TEvento
}