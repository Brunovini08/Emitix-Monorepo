import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from "class-validator";
import { TDistDFeInt } from "./TDistDFeInt";

export class TEnvDistDFeInt {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => TDistDFeInt)
  distDFeInt: TDistDFeInt

  @IsNotEmpty({
    message: 'UF é obrigatório'
  })
  uf: string
}