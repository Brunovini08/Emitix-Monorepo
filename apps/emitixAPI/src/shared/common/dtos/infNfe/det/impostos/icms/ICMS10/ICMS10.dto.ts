import { Type } from 'class-transformer';
import {
  Equals,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TDec_0302a04 } from 'src/core/nfe/domain/types/primitivies_types/TDec_0302a04';
import  { TDec_0302a04Opc } from 'src/core/nfe/domain/types/primitivies_types/TDec_0302a04Opc';
import  { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';
import  { TorigEnum } from 'src/core/nfe/domain/types/primitivies_types/Torig';

export class ICMS10Dto {
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
  @Equals('10')
  @IsString()
  CST: string; // Código de Situação Tributária (CST) do ICMS (10)

  @IsNotEmpty({
    message: `
      Modalidade de determinação da BC do ICMS
      0 - Margem Valor Agregado (%)
      1 - Pauta (valor)
      2 - Preço Tabelado Máximo (valor)
      3 - Valor da Operação
    `,
  })
  @IsIn(['0', '1', '2', '3'])
  @IsString()
  /*
   * Modalidade de determinação da BC do ICMS
   * 0 - Margem Valor Agregado (%)
   * 1 - Pauta (valor)
   * 2 - Preço Tabelado Máximo (valor)
   * 3 - Valor da Operação
   */
  modBC: string; // Modalidade de determinação da BC do ICMS

  @IsNotEmpty({
    message: 'Valor da BC do ICMS é obrigatório',
  })
  @Type(() => TDec_1302)
  vBC: TDec_1302; // Valor da base de cálculo do ICMS (valor)

  @IsNotEmpty({
    message: 'Alíquota do ICMS é obrigatória',
  })
  @Type(() => TDec_0302a04)
  pICMS: TDec_0302a04; // Alíquota do ICMS (%)

  @IsNotEmpty({
    message: 'Valor do ICMS (valor) é obrigatório',
  })
  @Type(() => TDec_1302)
  vICMS: TDec_1302; // Valor do ICMS (valor)

  @IsOptional()
  @Type(() => TDec_1302)
  vBCFCP: TDec_1302;

  @IsOptional()
  @Type(() => TDec_0302a04Opc)
  pFCP: TDec_0302a04Opc;

  @IsOptional()
  @Type(() => TDec_1302)
  vFCP: TDec_1302;

  @IsNotEmpty({
    message: `
    Modalidade de determinação da BC do ICMS ST: 0 -
    Preço tabelado ou máximo sugerido; 1 - Lista Negativa;
    2 - Lista Positiva; 3 - Lista Neutra; 4 - Margem Valor
    Agregado (%); 5 - Pauta; 6 - Valor da Operação;
    `,
  })
  @IsString()
  @IsIn(['0', '1', '2', '3', '4', '5', '6'])
  modBCST: string;

  @IsOptional()
  @Type(() => TDec_0302a04Opc)
  pMVAST: TDec_0302a04Opc; // Percentual da Margem de Valor Adicionado ICMS ST

  @IsOptional()
  @Type(() => TDec_0302a04Opc)
  pRedBCST: TDec_0302a04Opc; // Percentual de redução da BC ICMS ST

  @IsNotEmpty({
    message: 'Valor da BC do ICMS ST',
  })
  @Type(() => TDec_1302)
  vBCST: TDec_1302;

  @IsNotEmpty({
    message: 'Alíquota do ICMS ST',
  })
  @Type(() => TDec_0302a04)
  pICMSST: TDec_0302a04;

  @IsNotEmpty({
    message: 'Valor do ICMS ST',
  })
  @Type(() => TDec_1302)
  VICMSST: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  vBCFCPST: TDec_1302;

  @IsOptional()
  @Type(() => TDec_0302a04Opc)
  pFCPST: TDec_0302a04Opc;

  @IsOptional()
  @Type(() => TDec_1302)
  vFCPPST: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSSTDeson: TDec_1302;

  @IsOptional()
  @IsString()
  @IsIn(['3', '9', '12'])
  motDesICMSST: string;
}
