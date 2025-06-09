import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { TLocal } from 'src/core/nfe/domain/types/primitivies_types/TLocal';

export class retiradaDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => TLocal)
  retirada: TLocal;
}
