import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { TTNSU } from "../../primitivies_types/TTNSU";

export class TConsNSU {
  @IsNotEmpty({
    message: 'O elemento NSU não pode estar vazio'
  })
  @Type(() => TTNSU)
  NSU: TTNSU
}