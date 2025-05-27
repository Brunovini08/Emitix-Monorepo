import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { TDec_1203 } from 'src/core/nfe/reusable/types/primitivies_types/TDec_1203';
import { TString } from 'src/core/nfe/reusable/types/primitivies_types/TString';
import { lacresDto } from './lacres.dto';

export class volDto {
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{1,15}$/)
  qVol: string;

  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  @Type(() => TString)
  esp: TString;

  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  @Type(() => TString)
  marca: TString;

  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  @Type(() => TString)
  nVol: TString;

  @IsOptional()
  @Type(() => TDec_1203)
  pesoL: TDec_1203;

  @IsOptional()
  @Type(() => TDec_1203)
  pesoB: TDec_1203;

  @IsOptional()
  @MinLength(0)
  @MaxLength(5000)
  @ValidateNested()
  @Type(() => lacresDto)
  lacres: lacresDto;
}
