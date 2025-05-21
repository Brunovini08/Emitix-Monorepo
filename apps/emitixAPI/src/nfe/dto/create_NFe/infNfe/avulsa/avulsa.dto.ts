import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TCnpj } from 'src/nfe/reusable/types/primitivies_types/TCnpj';
import { TData } from 'src/nfe/reusable/types/primitivies_types/TData';
import { TDec_1302 } from 'src/nfe/reusable/types/primitivies_types/TDec_1302';
import { TString } from 'src/nfe/reusable/types/primitivies_types/TString';
import { TUfEmi } from 'src/nfe/reusable/types/primitivies_types/TUfEmi';
export class avulsaDto {
  @IsNotEmpty({
    message: 'CNPJ do Órgão emissor',
  })
  @Type(() => TCnpj)
  CNPJ: TCnpj; // CNPJ do órgão emissor, com 14 dígitos numéricos.

  @IsNotEmpty({
    message: 'Órgão emitente',
  })
  @MinLength(1, { message: 'Órgão emitente deve ter pelo menos 1 caractere' })
  @MaxLength(60, { message: 'Órgão emitente deve ter no máximo 60 caracteres' })
  @Type(() => TString)
  xOrgao: TString; // Nome do órgão emissor da NFe avulsa.

  @IsNotEmpty({
    message: 'Matrícula do agente',
  })
  @MinLength(1, {
    message: 'Matrícula do agente deve ter pelo menos 1 caractere',
  })
  @MaxLength(60, {
    message: 'Matrícula do agente deve ter no máximo 60 caracteres',
  })
  @Type(() => TString)
  matr: TString; // Matrícula do agente emissor da NFe avulsa.

  @IsNotEmpty({
    message: 'Nome do agente',
  })
  @MinLength(1, { message: 'Nome do agente deve ter pelo menos 1 caractere' })
  @MaxLength(60, { message: 'Nome do agente deve ter no máximo 60 caracteres' })
  @Type(() => TString)
  xAgente: TString; // Nome do agente emissor da NFe avulsa.

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{6, 14}$/)
  fone: string;

  @IsNotEmpty({
    message: 'Sigla da Unidade da Federação',
  })
  @Type(() => TUfEmi)
  UF: TUfEmi;

  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  @Type(() => TString)
  nDAR: TString;

  @IsOptional()
  @Type(() => TData)
  dEmi: TData;

  @IsOptional()
  @Type(() => TDec_1302)
  vDAR: TDec_1302;

  @IsNotEmpty({
    message: 'Repartição Fiscal emitente',
  })
  @MinLength(1)
  @MaxLength(60)
  @Type(() => TString)
  repEmi: TString;

  @IsOptional()
  @Type(() => TData)
  dPag: TData;
}
