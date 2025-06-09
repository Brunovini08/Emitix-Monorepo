import { Type } from 'class-transformer';
import { IsOptional, MaxLength, MinLength } from 'class-validator';
import  { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';
import  { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';

export class fatDto {
  @IsOptional()
  @Type(() => TString)
  @MinLength(1)
  @MaxLength(60)
  nFat: TString;

  @IsOptional()
  @Type(() => TDec_1302)
  vOrig: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  vDesc: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  vLiq: TDec_1302;
}
