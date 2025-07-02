import { ArrayMaxSize, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsOptional, ValidateNested } from 'class-validator';
import { TVeiculo } from 'src/core/nfe/domain/types/primitivies_types/TVeiculo';

export class veiculoComReboqueDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => TVeiculo)
  veicTransp: TVeiculo;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(5)
  @ValidateNested()
  @Type(() => TVeiculo)
  reboque: TVeiculo[];
}
