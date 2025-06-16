// endereco.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsNumberString,
  Length,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TUf } from './TUf';

export class TLocal {
  @IsString()
  @IsNotEmpty()
  xLgr: string;

  @IsString()
  @IsNotEmpty()
  nro: string;

  @IsOptional()
  @IsString()
  xCpl?: string;

  @IsString()
  @IsNotEmpty()
  xBairro: string;

  @IsNumberString()
  @Length(7, 7, { message: 'Código do município deve ter 7 dígitos' })
  cMun: string;

  @IsString()
  @IsNotEmpty()
  xMun: string;

  @ValidateNested()
  @Type(() => TUf)
  @Length(2, 2)
  UF: TUf;
}

// Implementação dos tipos básicos referenciados
export type TEnd = string; // Tipo para logradouro
export type TNum = string; // Tipo para número
export type TComp = string; // Tipo para complemento
export type TBairro = string;
export type TCodMun = string;
export type TMun = string;
