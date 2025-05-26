import { Type } from 'class-transformer';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { TDec_1302 } from 'src/core/nfe/reusable/types/primitivies_types/TDec_1302';
import { TString } from 'src/core/nfe/reusable/types/primitivies_types/TString';

export class deducDto {
  @IsNotEmpty({
    message: 'Descrição da Dedução',
  })
  @Type(() => TString)
  @MinLength(1)
  @MaxLength(60)
  xDed: TString;

  @IsNotEmpty({
    message: 'Valor da Dedução',
  })
  @Type(() => TDec_1302)
  vDed: TDec_1302;
}
