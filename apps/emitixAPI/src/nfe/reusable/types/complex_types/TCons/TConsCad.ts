import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, Validate, ValidateNested } from "class-validator";
import { TInfCons } from "../../primitivies_types/TInfCons";
import { TCodUfIBGE } from "../../primitivies_types/TCodUfIBGE";
import { TAmb } from "../../primitivies_types/TAmb";

export class TConsCad {
  @IsNotEmpty({
    message: 'O elemento versao não pode ser vazio'
  })
  versao: string;
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => TInfCons)
  infCons: TInfCons;

  @IsNotEmpty({
    message: 'O elemento tpAmb não pode ser vazio'
  })
  @Type(() => TAmb)
  tpAmb: TAmb;

  @IsNotEmpty({
    message: 'O elemento cUF não pode ser vazio'
  })
  @Type(() => TCodUfIBGE)
  cUF: TCodUfIBGE
}