import { Type } from 'class-transformer';
import {
  IsEmpty,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import  { enderEmitDto } from 'src/core/nfe/domain/types/complex_types/TEnderEmi/enderEmit.dto';
import  { TCnpj } from 'src/core/nfe/domain/types/primitivies_types/TCnpj';
import  { TCpf } from 'src/core/nfe/domain/types/primitivies_types/TCpf';
import  { TIdEstrangeiro } from 'src/core/nfe/domain/types/primitivies_types/TIdEstrangeiro';
import  { TIe } from 'src/core/nfe/domain/types/primitivies_types/TIe';
import  { TIeST } from 'src/core/nfe/domain/types/primitivies_types/TIeST';
import  { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';

export class emitDto {
  @IsNotEmpty({
    message: 'Número do CNPJ o emitente',
  })
  @ValidateIf((o) => !o.CPF && !o.idEstrangeiro)
  @Type(() => TCnpj)
  CNPJ: TCnpj; // CNPJ do emitente, com 14 dígitos numéricos.

  @IsEmpty({ message: 'Número do CPF do emitente' })
  @ValidateIf((o) => !o.CNPJ && !o.idEstrangeiro)
  @Type(() => TCpf)
  CPF: TCpf; // CPF do emitente, com 11 dígitos numéricos.

  @IsNotEmpty({ message: 'Número de identificação estrangeiro' })
  @ValidateIf((o) => !o.CNPJ && !o.CPF)
  @Type(() => TIdEstrangeiro)
  idEstrangeiro: TIdEstrangeiro;

  @IsNotEmpty({ message: 'xNome is required' })
  @MinLength(2, { message: 'xNome must be at least 2 characters' })
  @MaxLength(60, { message: 'xNome must be less than 60 characters' })
  @Type(() => TString)
  xNome: TString; // Razão social do emitente

  @IsOptional()
  @MinLength(1, { message: 'xFant must be at least 1 character' })
  @MaxLength(60, { message: 'xFant must be less than 60 characters' })
  @Type(() => TString)
  xFant: TString; // Nome fantasia do emitente

  @IsNotEmpty({ message: 'enderEmit is required' })
  @ValidateNested()
  @Type(() => enderEmitDto)
  enderEmit: enderEmitDto; // Endereço do emitente

  @IsNotEmpty({
    message: 'Inscrição Estadual do Emitente',
  })
  @Type(() => TIe)
  IE: TIe;

  @IsOptional()
  @Type(() => TIeST)
  IEST: TIeST; // Inscrição Estadual Substituta do emitente

  @IsOptional()
  @MinLength(1, { message: 'IM must be at least 1 character' })
  @MaxLength(15, { message: 'IM must be less than 15 characters' })
  @Type(() => TString)
  IM: TString; // Inscrição Municipal do emitente

  @IsString()
  @IsOptional()
  @Matches(/^[0-9]{7}$/, {
    message: 'CNAE must be a 7-digit number',
  })
  CNAE: string; // Código Nacional de Atividade Econômica do emitente

  @IsNotEmpty({
    message:
      'Código de Regime Tributário. Este campo será obrigatoriamente preenchido com: 1 – Simples Nacional; 2 – Simples Nacional – excesso de sublimite de receita bruta; 3 – Regime Normal. 4 - Simples Nacional - Microempreendedor individual - MEI',
  })
  @IsIn(['1', '2', '3', '4'], { message: 'CRT must be either 1, 2, 3 or 4' })
  CRT: string; // Código de Regime Tributário do emitente. 1=Simples Nacional; 2=Simples Nacional - excesso de sublimite; 3=Regime Normal
  // e 4= Simples Nacional - Microempreendedor indiviual - MEI
}
