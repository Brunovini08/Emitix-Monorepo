import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { lacresDto } from './lacres.dto';
import  { TDec_1203 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1203';
import  { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';

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
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(5000)
  @ValidateNested()
  @Type(() => lacresDto)
  lacres: lacresDto;
}
