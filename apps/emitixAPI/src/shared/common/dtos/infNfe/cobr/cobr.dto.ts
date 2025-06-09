import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { fatDto } from './fat.dto';
import { dupDto } from './dup.dto';

export class cobrDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => fatDto)
  fat: fatDto;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(120)
  @ValidateNested()
  @Type(() => dupDto)
  dup: dupDto[];
}
