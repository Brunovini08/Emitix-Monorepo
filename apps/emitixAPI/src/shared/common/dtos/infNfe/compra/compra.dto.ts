import { Type } from 'class-transformer';
import { IsOptional, MaxLength, MinLength } from 'class-validator';
import { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';

export class compraDto {
  @IsOptional()
  @Type(() => TString)
  @MinLength(1)
  @MaxLength(22)
  xNEmp: TString;

  @IsOptional()
  @Type(() => TString)
  @MinLength(1)
  @MaxLength(60)
  xPed: TString;

  @IsOptional()
  @Type(() => TString)
  @MinLength(1)
  @MaxLength(60)
  xCont: TString;
}
