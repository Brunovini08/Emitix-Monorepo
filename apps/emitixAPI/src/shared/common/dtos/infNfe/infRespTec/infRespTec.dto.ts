import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { TInfRespTec } from 'src/core/nfe/domain/types/complex_types/TInfRespTec/TInfRespTec';

export class infRespTecDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => TInfRespTec)
  infResTec: TInfRespTec;
}
