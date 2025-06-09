import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsOptional,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { obsContentDto } from '../det/obsItem/obsContent.dto';
import { procRefDto } from './procRef.dto';
import { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';

export class infAdicDto {
  @IsOptional()
  @Type(() => TString)
  @MinLength(0)
  @MaxLength(2000)
  infAdFisco: TString;

  @IsOptional()
  @Type(() => TString)
  @MinLength(0)
  @MaxLength(5000)
  infCpl: TString;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(10)
  @ValidateNested()
  @Type(() => obsContentDto)
  obsCont: obsContentDto[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(10)
  @ValidateNested()
  @Type(() => obsContentDto)
  obsFisco: obsContentDto[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(100)
  @ValidateNested()
  @Type(() => procRefDto)
  procRef: procRefDto[];
}
