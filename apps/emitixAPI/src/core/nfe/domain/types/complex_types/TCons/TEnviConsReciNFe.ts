import { IsNotEmptyObject, ValidateNested } from "class-validator";
import { TConsReciNFe } from "./TConsReciNFe";
import { Type } from "class-transformer";

export class TEnviConsReciNFe {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => TConsReciNFe)
  consReciNFe: TConsReciNFe
}