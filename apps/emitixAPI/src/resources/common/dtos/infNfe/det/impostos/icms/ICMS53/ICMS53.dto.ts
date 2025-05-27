import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  Equals,
  IsOptional,
} from 'class-validator';
import { TDec_0302a04 } from 'src/core/nfe/reusable/types/primitivies_types/TDec_0302a04';
import { TDec_0302a04Max100 } from 'src/core/nfe/reusable/types/primitivies_types/TDec_0302a04Max100';
import { TDec_1104v } from 'src/core/nfe/reusable/types/primitivies_types/TDec_1104v';
import { TDec_1302 } from 'src/core/nfe/reusable/types/primitivies_types/TDec_1302';
import { TorigEnum } from 'src/core/nfe/reusable/types/primitivies_types/Torig';

export class ICMS53Dto {
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
    message: `Tributação pelo ICMS 53 = Tributação com Diferimento`,
  })
  @Equals('53')
  @IsString()
  CST: string; // Código de Situação Tributária (CST) do ICMS (40)

  @IsOptional()
  @Type(() => TDec_1104v)
  qBCMono: TDec_1104v; // Quantidade tributada

  @IsOptional()
  @Type(() => TDec_0302a04)
  adRemICMS: TDec_0302a04; // ALíquota ad rem do imposto (R$)

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSMonoOp: TDec_1302; // Valor do ICMS da operação (R$)

  @IsOptional()
  @Type(() => TDec_0302a04Max100)
  pDof: TDec_0302a04Max100; // Percentual do diferemento

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSMonoDif: TDec_1302; // Valor do ICMS diferido (R$)

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSMono: TDec_1302; // Valor do ICMS proóprio devido

  @IsOptional()
  @Type(() => TDec_1104v)
  qBCMonoDif: TDec_1104v; // Quantidade tributada diferida

  @IsOptional()
  @Type(() => TDec_0302a04)
  adRemICMSDif: TDec_0302a04; // Alíquota ad rem do imposto diferido
}
