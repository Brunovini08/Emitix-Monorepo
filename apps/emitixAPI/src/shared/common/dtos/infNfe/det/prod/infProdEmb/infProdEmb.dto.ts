import { Type } from 'class-transformer';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import  { TDec_0803v } from 'src/core/nfe/domain/types/primitivies_types/TDec_0803v';
import  { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';

export class infProdEmbDto {
  @IsNotEmpty({
    message: 'Embalagem do produto é obrigatória',
  })
  @MinLength(1)
  @MaxLength(8)
  @Type(() => TString)
  xEmb: TString; //Embalagem do produto

  @IsNotEmpty({
    message: 'Volume do produto na embalagem é obrigatório',
  })
  @Type(() => TDec_0803v)
  qVolEmb: TDec_0803v; //Volume do produto na embalagem

  @IsNotEmpty({
    message: 'Unidade de Medida da Embalagem é obrigatória',
  }) //Unidade de Medida da Embalagem
  @MinLength(1)
  @MaxLength(8)
  @Type(() => TString)
  uEmb: TString;
}
