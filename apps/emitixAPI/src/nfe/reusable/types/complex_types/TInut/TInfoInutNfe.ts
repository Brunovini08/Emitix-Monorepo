import { Type } from "class-transformer";
import { IsNotEmptyObject, ValidateNested } from "class-validator";
import TInutNFe from "./TInutNfe";

export default class TInfoInutNFe {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => TInutNFe)
  infInut: TInutNFe
}