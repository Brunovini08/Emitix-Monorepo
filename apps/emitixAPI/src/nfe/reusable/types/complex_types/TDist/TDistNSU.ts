import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { TTNSU } from "../../primitivies_types/TTNSU";

export class TDistNSU {
  @IsNotEmpty({
    message: 'O elemento ultNSU não pode ser vazio'
  })
  @Type(() => TTNSU)
  ultNSU: TTNSU
}