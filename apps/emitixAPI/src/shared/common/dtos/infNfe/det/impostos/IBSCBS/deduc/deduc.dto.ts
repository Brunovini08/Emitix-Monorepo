import { Type } from 'class-transformer';
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';
import { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';

export class deducDto {
  @IsNotEmpty({
    message: 'Descrição da dedução é obrigatória',
  })
  @MinLength(1, {
    message: 'Descrição da dedução deve ter pelo menos 1 caractere',
  })
  @MaxLength(60, {
    message: 'Descrição da dedução deve ter no máximo 60 caracteres',
  })
  @Type(() => TString)
  xDed: TString;

  @IsNotEmpty({
    message: 'Valor da dedução é obrigatório',
  })
  @Type(() => TDec_1302)
  vDed: TDec_1302;
} 