import { Type } from "class-transformer";
import { IsNotEmptyObject, ValidateNested } from "class-validator";
import { TString } from "src/core/nfe/domain/types/primitivies_types/TString";

export class CreateCteDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => TString)
  TCTe: TString
}