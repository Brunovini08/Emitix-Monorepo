import { Type } from "class-transformer";
import { IsNotEmptyObject, ValidateNested } from "class-validator";
import TConsSitNfe from "./TConsSitNfe";

export default class TEnvConsSitNfe {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => TConsSitNfe)
  consSitNFe: TConsSitNfe
}