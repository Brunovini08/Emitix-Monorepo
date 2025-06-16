import { Type } from 'class-transformer';
import {
  Equals,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import  { TDec_0302a04 } from 'src/core/nfe/domain/types/primitivies_types/TDec_0302a04';
import  { TDec_0302Max100 } from 'src/core/nfe/domain/types/primitivies_types/TDec_0302Max100';
import  { TDec_1104v } from 'src/core/nfe/domain/types/primitivies_types/TDec_1104v';
import  { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';
import { TorigEnum } from 'src/core/nfe/domain/types/primitivies_types/Torig';

export class ICMS15Dto {
  //Tributação monofásica própria e com responsabilidade pela retenção sobre combustíveis

  @IsNotEmpty({
    message: 'Origem da mercadoria',
  })
  @IsEnum(TorigEnum, {
    message: `
    Origem da mercadoria: 
    0 - Nacional
    1 - Estrangeira - Importação direta
    2 - Estrangeira - Adquirida no mercado interno
    `,
  })
  @IsNotEmpty({
    message: `Código de Situação Tributária (CST) do ICMS (00, 02, 10, 20, 30, 40, 41, 50, 51, 60, 70, 90)`,
  })
  @Equals('15')
  @IsString()
  CST: string;
  /**
   Tributção pelo ICMS15= Tributação monofásica própria e com 
   responsabilidade pela retenção sobre combustíveis;
   */

  @IsOptional()
  @Type(() => TDec_1104v)
  qBCMono: TDec_1104v; // Quantidade tributada

  @IsNotEmpty({
    message: 'Alíquota ad rem do imposto',
  })
  @Type(() => TDec_0302a04)
  adRemICMS: TDec_0302a04; // Alíquota ad rem do imposto.

  @IsNotEmpty({
    message: 'Valor dor ICMS próprio',
  })
  @Type(() => TDec_1302)
  vICMSMono: TDec_1302; // Valor do ICMS próprio

  @IsOptional()
  @Type(() => TDec_1104v)
  qBCMonoReten: TDec_1104v; // Quantidade tributada sujeita a retenção.

  @IsOptional()
  @Type(() => TDec_0302a04)
  adRemICMSReten: TDec_0302a04; // Alíquota ad rem do imposto com retenção.

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSMonoReten: TDec_1302; // Valor do ICMS com retenção

  @IsOptional()
  @Type(() => TDec_0302Max100)
  pRedAdRem: TDec_0302Max100; // PErcentual de redução do valor da alíquota ad rem do ICMS.

  @IsOptional()
  @IsString()
  @IsIn(['1', '9'])
  motRedAdRem: string;
  /**
   Motivo da redução do adrem
     1= Transporte coletivo de passageiros; 9=Outros;
   */
}
