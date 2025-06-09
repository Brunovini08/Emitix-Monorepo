import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TUf } from './TUf';
import { TString } from './TString';

export class TVeiculo {
  @IsNotEmpty({
    message: 'Placa do veículo',
  })
  @IsString()
  @Matches(/^[A-Z]{2,3}[0-9]{4}|[A-Z]{3,4}[0-9]{3}|[A-Z0-9]{7}$/)
  placa: string;

  @IsOptional()
  @Type(() => TUf)
  UF: TUf;

  @IsOptional()
  @MinLength(1)
  @MaxLength(20)
  @Type(() => TString)
  RNTC: TString;
}
