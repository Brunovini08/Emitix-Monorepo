import { Type } from "class-transformer";
import { IsNotEmptyObject, ValidateNested } from "class-validator";
import { TConsCad } from "./TConsCad";

export class TEnvConsCad {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => TConsCad)
  ConsCad: TConsCad
}