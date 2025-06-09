import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { deducDto } from './forDia/deduc.dto';
import  { TDec_1110v } from 'src/core/nfe/domain/types/primitivies_types/TDec_1110v';
import  { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';
import  { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';
import  { forDiaDto } from './forDia/forDia.dto';

export class canaDto {
  @IsNotEmpty({
    message: 'Identificação da safra',
  })
  @ValidateNested()
  @Type(() => TString)
  @MinLength(4)
  @MaxLength(9)
  safra: TString;

  @IsNotEmpty({
    message: 'Mês e Ano de Referência, formato: MM/AAAA',
  })
  @IsString()
  @Matches(/^(0[0-9]1[0-2])([/][2][0-9][0-9][0-9])$/)
  ref: string;

  @IsNotEmpty({
    message: 'Fornecimentos diários',
  })
  @ValidateNested()
  @Type(() => forDiaDto)
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(31)
  forDia: forDiaDto;

  @IsNotEmpty({
    message: 'Total do mês',
  })
  @ValidateNested()
  @Type(() => TDec_1110v)
  qTotMes: TDec_1110v;

  @IsNotEmpty({
    message: 'Total Anterior',
  })
  @ValidateNested()
  @Type(() => TDec_1110v)
  qTotAnt: TDec_1110v;

  @IsNotEmpty({
    message: 'Total Geral',
  })
  @ValidateNested()
  @Type(() => TDec_1110v)
  qTotGer: TDec_1110v;

  @IsNotEmpty({
    message: 'Deduções - Taxas e Contribuições',
  })
  @ValidateNested()
  @Type(() => deducDto)
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(10)
  deduc: deducDto[];

  @IsNotEmpty({
    message: 'Valor dos fornecimentos',
  })
  @ValidateNested()
  @Type(() => TDec_1302)
  vFor: TDec_1302;

  @IsNotEmpty({
    message: 'Valor Total das Deduções',
  })
  @ValidateNested()
  @Type(() => TDec_1302)
  vTotDed: TDec_1302;

  @IsNotEmpty({
    message: 'Valor Líquido dos fornecimentos',
  })
  @ValidateNested()
  @Type(() => TDec_1302)
  vLiqFor: TDec_1302;
}
