import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import type { enderDto } from './ender.dto';
import { TString } from 'src/nfe/reusable/types/primitivies_types/TString';
import { Type } from 'class-transformer';

export class enderEmitDto implements enderDto {
  @IsNotEmpty({ message: 'xLgr is required' })
  @MaxLength(60, { message: 'xLgr must be less than 60 characters' })
  @Type(() => TString)
  xLgr: TString; // Logradouro do emitente

  @IsNotEmpty({ message: 'nro is required' })
  @MaxLength(60, { message: 'nro must be less than 60 characters' })
  nro: string; // Número do logradouro do emitente

  @IsOptional()
  @Type(() => TString)
  @MinLength(0)
  @MaxLength(60)
  xCpl: TString;

  @IsNotEmpty({ message: 'xBairro is required' })
  @MaxLength(60, { message: 'xBairro must be less than 60 characters' })
  xBairro: string; // Bairro do emitente

  @IsNotEmpty({ message: 'cMun is required' })
  cMun: string; // Código do município do emitente. Ex: 3550308=São Paulo/SP

  @IsNotEmpty({ message: 'xMun is required' })
  @MaxLength(60, { message: 'xMun must be less than 60 characters' })
  xMun: string; // Nome do município do emitente

  @IsNotEmpty({ message: 'UF is required' })
  UF: string; // Unidade da Federação do emitente. Ex: SP=São Paulo, RJ=Rio de Janeiro, MG=Minas Gerais

  @IsNotEmpty({ message: 'CEP is required' })
  CEP: string; // Código de Endereçamento Postal (CEP) do emitente. Ex: 01001-000

  @IsNotEmpty({ message: 'cPais is required' })
  cPais: string; // Código do país do emitente. Ex: 1058=Brasil

  @IsNotEmpty({ message: 'xPais is required' })
  @MaxLength(60, { message: 'xPais must be less than 60 characters' })
  xPais: string; // Nome do país do emitente. Ex: Brasil

  @IsNotEmpty({ message: 'fone is required' })
  fone: string; // Telefone do emitente. Ex: (11) 1234-5678
}
