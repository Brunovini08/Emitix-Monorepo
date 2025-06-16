import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import  { TData } from 'src/core/nfe/domain/types/primitivies_types/TData';
import  { TDec_0803v } from 'src/core/nfe/domain/types/primitivies_types/TDec_0803v';
import  { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';

export class rastroDto {
  @IsNotEmpty({
    message: 'Número do lote do produto é obrigatório',
  })
  @MinLength(1)
  @MaxLength(20)
  @Type(() => TString)
  nLote: TString; //Número do lote do produto.

  @IsNotEmpty({
    message: 'Quantidade de produto no lote é obrigatório',
  })
  @Type(() => TDec_0803v)
  qLote: TDec_0803v; //Quantidade de produto no lote.

  @IsNotEmpty({
    message: 'Data de fabricação/produção. Formato AAA-MM-DD é obrigatório',
  })
  @IsDate()
  @Type(() => TData)
  dFab: TData;

  @IsNotEmpty({
    message:
      'Data de validade. Informar o último dia do mês caso a validade não especifique o dia. Formato AAA-MM-DD é obrigatório',
  })
  @IsDate()
  @Type(() => TData)
  dVal: TData;

  @IsOptional()
  @MinLength(1)
  @MaxLength(20)
  @Type(() => TString)
  cAgreg: TString;
}
