import { Type } from 'class-transformer';
import {
  Equals,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TDec_0302a04 } from 'src/core/nfe/domain/types/primitivies_types/TDec_0302a04';
import { TDec_1104v } from 'src/core/nfe/domain/types/primitivies_types/TDec_1104v';
import { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';
import { TorigEnum } from 'src/core/nfe/domain/types/primitivies_types/Torig';

export class ICMS61Dto {
  @IsNotEmpty({
    message: `Origem da mercadoria é obrigatório`,
  })
  @IsString()
  orig: string;

  @IsNotEmpty()
  @IsEnum(TorigEnum, {
    message: `
           Origem da mercadoria: 
           0 - Nacional
           1 - Estrangeira - Importação direta
           2 - Estrangeira - Adquirida no mercado interno
           `,
  })
  @IsNotEmpty({
    message: `Tributação pelo ICMS 61 = Tributação com Diferimento`,
  })
  @Equals('61')
  @IsString()
  CST: string; // Código de Situação Tributária (CST) do ICMS (61)

  @IsOptional()
  @Type(() => TDec_1104v)
  qBCMonoRet: TDec_1104v; // Quantidade tributada retidata anteriormente

  @IsOptional()
  @Type(() => TDec_0302a04)
  adRemICMSRet: TDec_0302a04; // ALíquota ad rem do imposto retido anteriormente (R$)

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSMonoRet: TDec_1302; // Valor do ICMS da operação retido anteriormente (R$)
}
