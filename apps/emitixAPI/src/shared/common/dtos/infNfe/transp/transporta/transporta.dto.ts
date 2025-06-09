import { Type } from 'class-transformer';
import { IsOptional, MaxLength, MinLength } from 'class-validator';
import  { TCnpj } from 'src/core/nfe/domain/types/primitivies_types/TCnpj';
import  { TCpf } from 'src/core/nfe/domain/types/primitivies_types/TCpf';
import  { TIeDest } from 'src/core/nfe/domain/types/primitivies_types/TIeDest';
import  { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';
import  { TUf } from 'src/core/nfe/domain/types/primitivies_types/TUf';

export class transportaDto {
  @IsOptional()
  @Type(() => TCnpj)
  CNPJ: TCnpj;

  @IsOptional()
  @Type(() => TCpf)
  CPF: TCpf;

  @IsOptional()
  @MinLength(0)
  @MaxLength(60)
  @Type(() => TString)
  xNome: TString;

  @IsOptional()
  @Type(() => TIeDest)
  IE: TIeDest;

  @IsOptional()
  @MinLength(0)
  @MaxLength(60)
  @Type(() => TString)
  xEnder: TString;

  @IsOptional()
  @MinLength(0)
  @MaxLength(60)
  @Type(() => TString)
  xMun: TString;

  @IsOptional()
  @Type(() => TUf)
  UF: TUf;
}
