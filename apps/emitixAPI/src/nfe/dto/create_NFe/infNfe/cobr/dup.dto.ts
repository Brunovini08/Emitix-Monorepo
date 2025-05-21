import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { TData } from 'src/nfe/reusable/types/primitivies_types/TData';
import { TDec_1302Opc } from 'src/nfe/reusable/types/primitivies_types/TDec_1302Opc';
import { TString } from 'src/nfe/reusable/types/primitivies_types/TString';

export class dupDto {
  @IsOptional()
  @Type(() => TString)
  @MinLength(1)
  @MaxLength(60)
  nDUp: TString;

  @IsOptional()
  @Type(() => TData)
  dVenc: TData;

  @IsNotEmpty({
    message: 'Valor da duplicata',
  })
  @Type(() => TDec_1302Opc)
  vDup: TDec_1302Opc;
}
