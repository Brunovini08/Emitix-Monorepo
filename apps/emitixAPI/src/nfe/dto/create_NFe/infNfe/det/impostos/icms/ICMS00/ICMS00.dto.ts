import { Type } from 'class-transformer';
import {
  Equals,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TDec_0302a04 } from 'src/nfe/reusable/types/primitivies_types/TDec_0302a04';
import { TDec_0302a04Opc } from 'src/nfe/reusable/types/primitivies_types/TDec_0302a04Opc';
import { TDec_1302 } from 'src/nfe/reusable/types/primitivies_types/TDec_1302';
import { TorigEnum } from 'src/nfe/reusable/types/primitivies_types/Torig';

export class ICMS00Dto {
  @IsNotEmpty({
    message: `
    Origem da mercadoria: 
    0 - Nacional
    1 - Estrangeira - Importação direta
    2 - Estrangeira - Adquirida no mercado interno
    Uma opção é obrigatória
    `,
  })
  @IsEnum(TorigEnum, {
    message: `
    Origem da mercadoria: 
    0 - Nacional
    1 - Estrangeira - Importação direta
    2 - Estrangeira - Adquirida no mercado interno
    `,
  })
  orig: TorigEnum; // Origem da mercadoria (0 a 2)

  @IsNotEmpty({
    message:
      'Código de Situação Tributária (CST) do ICMS (00, 02, 10, 20, 30, 40, 41, 50, 51, 60, 70, 90)',
  })
  @Equals('00')
  CST: string; // Código de Situação Tributária (CST) do ICMS (00, 10, 20, 30, 40, 41, 50, 51, 60, 70, 90)

  /* 
    Código de Situação Tributária (CST) do ICMS:
    00 - Tributação integral
    10 - Tributação com redução de base de cálculo
    20 - Isenção do ICMS
    30 - Substituição tributária por apuração
    40 - Isenção do ICMS por conta de isenção ou não incidência
    41 - Isenção do ICMS por conta de isenção ou não incidência - Outros
    50 - Suspensão do ICMS por conta de suspensão ou não incidência
    51 - Suspensão do ICMS por conta de suspensão ou não incidência - Outros
    60 - Substituição tributária por apuração com redução de base de cálculo
    70 - Substituição tributária por apuração com redução de base de cálculo - Outros
    90 - Outros
  */

  @IsNotEmpty({
    message: `
    Modalidade de determinação da BC do ICMS:
    0 - Margem Valor Agregado (%)
    1 - Pauata (valor)
    2 - Preço Tabelado Máximo (valor)
    3 - Valor da Operação
    `,
  })
  @IsIn(['0', '1', '2', '3'], { message: 'modBC must be either 0, 1, 2 or 3' })
  @IsString()
  modBC: string; // Modalidade de determinação da BC do ICMS (0 a 3)
  /* 
    Modalidade de determinação da BC do ICMS:
    0 - Margem Valor Agregado (%)
    1 - Pauata (valor)
    2 - Preço Tabelado Máximo (valor)
    3 - Valor da Operação
  */

  @IsNotEmpty({
    message: 'Valor da BC do ICMS é obrigatório',
  })
  @Type(() => TDec_1302)
  vBC: TDec_1302; // Valor da base de cálculo do ICMS (valor)

  @IsNotEmpty({
    message: 'Alíquota do ICMS (%) é obrigatória',
  })
  @Type(() => TDec_0302a04)
  pICMS: TDec_0302a04; // Alíquota do ICMS (%)

  @IsNotEmpty({
    message: 'Valor do ICMS(valor) é obrigatório',
  })
  @Type(() => TDec_1302)
  vICMS: TDec_1302; // Valor do ICMS (valor)

  @IsOptional()
  @Type(() => TDec_0302a04Opc)
  pFCP: TDec_0302a04Opc; // Alíquota do FCP (%)

  /* 
    Alíquota do FCP (Fundo de Combate à Pobreza) - percentual aplicado sobre o valor da operação
    e destinado ao fundo de combate à pobreza.
  */

  @IsOptional()
  @Type(() => TDec_1302)
  vFCP: TDec_1302; // Valor do FCP (valor)

  /* 
    Valor do FCP (Fundo de Combate à Pobreza) - valor resultante da aplicação da alíquota do FCP sobre o valor da operação.
  */
}
