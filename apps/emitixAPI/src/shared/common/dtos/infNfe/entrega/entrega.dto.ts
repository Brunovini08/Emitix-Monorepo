import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { TLocal } from 'src/core/nfe/domain/types/primitivies_types/TLocal';

export class entregaDto {
  @Type(() => TLocal)
  @IsOptional()
  entrega: TLocal; // Identificação do local de entrega
}
