import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from "class-validator";
import { TString } from "../../nfe/reusable/types/primitivies_types/TString";

export class CreateCteDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => TString)
  TCTe: TString
}