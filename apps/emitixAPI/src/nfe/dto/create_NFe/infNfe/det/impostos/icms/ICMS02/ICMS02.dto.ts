import { Type } from 'class-transformer';
import {
  Equals,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TDec_0302a04 } from 'src/nfe/reusable/types/primitivies_types/TDec_0302a04';
import { TDec_1104v } from 'src/nfe/reusable/types/primitivies_types/TDec_1104v';
import { TDec_1302 } from 'src/nfe/reusable/types/primitivies_types/TDec_1302';
import { TorigEnum } from 'src/nfe/reusable/types/primitivies_types/Torig';

export class ICMS02Dto {
  @IsOptional()
  @IsEnum(TorigEnum, {
    message: `
    Origem da mercadoria: 
    0 - Nacional
    1 - Estrangeira - Importação direta
    2 - Estrangeira - Adquirida no mercado interno
    `,
  })
  orig: TorigEnum;

  @IsNotEmpty({
    message: `Código de Situação Tributária (CST) do ICMS (00, 02, 10, 20, 30, 40, 41, 50, 51, 60, 70, 90)`,
  })
  @Equals('02')
  @IsString()
  CST: string; // Código da Situação Tributária

  @IsOptional()
  @Type(() => TDec_1104v)
  qBCMono: TDec_1104v; // Quantidade tributada

  @IsNotEmpty({
    message: 'Alíquota ad rem do imposto é obrigatória',
  })
  @Type(() => TDec_0302a04)
  adRemICMS: TDec_0302a04; // Alíquota ad rem do imposto

  @IsNotEmpty({
    message: 'Valor do ICMS próprio é obrigatório',
  })
  @Type(() => TDec_1302)
  vICMSMOno: TDec_1302; // Valor do ICMS próprio
}
