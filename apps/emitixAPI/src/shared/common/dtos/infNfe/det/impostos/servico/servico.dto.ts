import { ISSQNDto } from './ISSQN.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { TIpi } from 'src/core/nfe/domain/types/complex_types/TIpi/TIpi';

export class servicoDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => TIpi)
  IPI: TIpi;

  @IsNotEmpty({
    message: 'O campo ISSQN não pode estar vazio',
  })
  @ValidateNested()
  @Type(() => ISSQNDto)
  ISSQN: ISSQNDto;
}
