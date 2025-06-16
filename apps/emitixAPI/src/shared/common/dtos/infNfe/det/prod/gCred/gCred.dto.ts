import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import  { TDec_0302a04 } from 'src/core/nfe/domain/types/primitivies_types/TDec_0302a04';
import  { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';

export class gCredDto {
  @IsNotEmpty({
    message:
      'Código de Benefício Fiscal de Crédito Presumido na UF aplicado ao item',
  })
  @IsString()
  @Matches(/^[!-ÿ]{8}|[!-ÿ]{10}$/)
  cCredPresumido: string; // Código de Benefício Fiscal de C´redito Presumido na UF aplicado ao item

  @IsNotEmpty({
    message: 'Percentual do Crédito Presumido',
  })
  @Type(() => TDec_0302a04)
  pCredPresumido: TDec_0302a04; // Percentual de Crédito Presumido aplicado ao item

  @IsNotEmpty({
    message: 'Valor do Crédito Presumido',
  })
  @Type(() => TDec_1302)
  vCredPresumido: TDec_1302; // Valor do Crédito Presumido aplicado ao item
}
