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

export class ICMS20Dto {
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
    message: `Código de Situação Tributária (CST) do ICMS (00, 02, 10, 20, 30, 40, 41, 50, 51, 60, 70, 90)`,
  })
  @Equals('20')
  @IsString()
  CST: string; // Código de Situação Tributária (CST) do ICMS (20)

  @IsNotEmpty({
    message: `
      Modalidade de determinação da BC do ICMS:
      0 - Margem Valor Agregado (%);
      1 - Pauta (valor);
      2 - Preço Tabelado Máximo (valor);
      3 - Valor da Operação.
    `,
  })
  @IsIn(['0', '1', '2', '3'])
  modBC: string;
  /*
  Modalidade de determinação da BC do ICMS:
   0 - Margem Valor Agregado (%);
   1 - Pauta (valor);
   2 - Preço Tabelado Máximo (valor);
   3 - Valor da Operação.
  */

  @IsNotEmpty({
    message: 'Percentual de recução da BC',
  })
  @Type(() => TDec_0302a04)
  pRedBC: TDec_0302a04; //Percentual de redução da BC

  @IsNotEmpty({
    message: 'Valor da BC do ICMS',
  })
  @Type(() => TDec_1302)
  vBC: TDec_1302; // Vaçpr da BC do ICMS

  @IsNotEmpty({
    message: 'Alíquota do ICMS',
  })
  @Type(() => TDec_0302a04)
  pICMS: TDec_0302a04; //Alíquota do ICMS

  @IsNotEmpty({
    message: 'Valor do ICMS',
  })
  @Type(() => TDec_1302)
  vICMS: TDec_1302; // Valor do ICMS

  @IsOptional()
  @Type(() => TDec_1302)
  vBCFCP: TDec_1302; // Valor da Base de cálculo do FCP

  @IsOptional()
  @Type(() => TDec_0302a04Opc)
  pFCP: TDec_0302a04Opc; // Percentual de ICMS relativo ao Fundo de Combate à Pobreza

  @IsOptional()
  @Type(() => TDec_1302)
  vFCP: TDec_1302; // Valor do ICMS relativo ao Fundo de Combate à Pobreza

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSDeson: TDec_1302; //Valor do ICMs de desoneração

  @IsOptional()
  @IsString()
  @IsIn(['3', '9', '12'])
  motDesICMS: string; //Motivo da desoneração do ICMS:3-Uso na agropecuária;9-Outros;12-Fomento agropecuário

  @IsOptional()
  @IsString()
  @IsIn(['0', '1'])
  indDeduzDeson: string;
  /**
   Indica se o valor do ICMS desonerado (vICMSDeson) deduz do valor do item (vProd):
   0=Valor do ICMS desonerado (vICMSDeson) não deduz do valor do item (vProd) / total da NF-e;
   1=Valor do ICMS desonerado (vICMSDeson) deduz do valor do item (vProd) / total da NF-e.
   */
}
