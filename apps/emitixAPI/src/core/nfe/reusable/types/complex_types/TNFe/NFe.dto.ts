import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { TNFeDto } from './TNFe';

export class NFeDto {
  @IsNotEmpty({
    message: 'A tag NFe deve estar no json que será enviado',
  })
  @ValidateNested()
  @Type(() => TNFeDto)
  NFe: TNFeDto;
}
