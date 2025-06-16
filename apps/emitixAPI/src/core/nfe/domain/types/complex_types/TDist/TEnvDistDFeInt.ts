import { Type } from "class-transformer";
import { IsNotEmptyObject, ValidateNested } from "class-validator";
import { TDistDFeInt } from "./TDistDFeInt";

export class TEnvDistDFeInt {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => TDistDFeInt)
  distDFeInt: TDistDFeInt
}