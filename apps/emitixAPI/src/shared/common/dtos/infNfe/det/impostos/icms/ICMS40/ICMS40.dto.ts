import { Type } from 'class-transformer';
import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';
import { TorigEnum } from 'src/core/nfe/domain/types/primitivies_types/Torig';

export class ICMS40Dto {
  @IsNotEmpty()
  @IsEnum(TorigEnum, {
    message: `
         Origem da mercadoria: 
         0 - Nacional
         1 - Estrangeira - Importação direta
         2 - Estrangeira - Adquirida no mercado interno
         `,
  })
  /*
   * Origem da mercadoria
   * 0 - Nacional
   * 1 - Estrangeira - Importação direta
   * 2 - Estrangeira - Adquirida no mercado interno
   */
  orig: TorigEnum; // Origem da mercadoria

  @IsNotEmpty({
    message: `Tributação pelo ICMS 40 - Isenta 41 - Não tributada 50 - Suspensão 51 - Diferimento`,
  })
  @IsIn(['40', '41', '50'])
  @IsString()
  CST: string; // Código de Situação Tributária (CST) do ICMS (40)

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSDeson: TDec_1302;

  @IsOptional()
  @IsString()
  @IsIn(['1', '3', '4', '5', '6', '7', '8', '9', '10', '11', '16', '90'])
  motDesICMS: string;

  @IsOptional()
  @IsString()
  @IsIn(['0', '1'])
  indDeduzDeson: string;
}
