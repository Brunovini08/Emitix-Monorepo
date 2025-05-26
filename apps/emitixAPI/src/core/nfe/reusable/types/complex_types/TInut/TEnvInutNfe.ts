import { Type } from "class-transformer";
import { IsNotEmptyObject, ValidateNested } from "class-validator";
import TInfoInutNFe from "./TInfoInutNfe";

export default class TEnvInutNfe {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => TInfoInutNFe)
  inutNFe: TInfoInutNFe;
}