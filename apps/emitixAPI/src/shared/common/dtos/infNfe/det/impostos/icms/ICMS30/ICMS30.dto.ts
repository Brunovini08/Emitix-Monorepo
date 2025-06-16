import { Type } from 'class-transformer';
import {
  Equals,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import  { TDec_0302a04 } from 'src/core/nfe/domain/types/primitivies_types/TDec_0302a04';
import  { TDec_0302a04Opc } from 'src/core/nfe/domain/types/primitivies_types/TDec_0302a04Opc';
import  { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';
import  { TorigEnum } from 'src/core/nfe/domain/types/primitivies_types/Torig';

export class ICMS30Dto {
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
  @Equals('30')
  @IsString()
  CST: string; // Código de Situação Tributária (CST) do ICMS (30)

  @IsNotEmpty({
    message: `
    Modalidade de determinação da BC do
    ICMS ST: 0 – Preço tabelado ou máximo sugerido; 1 -
    Lista Negativa (valor); 2 - Lista Positiva (valor); 3
    - Lista Neutra (valor); 4 - Margem Valor Agregado (%)
    `,
  })
  @IsString()
  @IsIn(['0', '1', '2', '3', '4', '5', '6'])
  modBCST: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TDec_0302a04Opc)
  pMVAST: TDec_0302a04Opc;

  @IsOptional()
  @ValidateNested()
  @Type(() => TDec_0302a04Opc)
  pRedBCST: TDec_0302a04Opc;

  @IsNotEmpty({
    message: 'Valor da BC do ICMS ST',
  })
  @ValidateNested()
  @Type(() => TDec_1302)
  vBCST: TDec_1302;

  @IsNotEmpty({
    message: 'Alíquota do ICMS ST',
  })
  @ValidateNested()
  @Type(() => TDec_0302a04)
  pICMSST: TDec_0302a04;

  @IsNotEmpty({
    message: 'Valor do ICMS ST',
  })
  @Type(() => TDec_1302)
  vICMSST: TDec_1302;

  @IsOptional()
  @ValidateNested()
  @Type(() => TDec_1302)
  vBCFCPST: TDec_1302;

  @IsOptional()
  @ValidateNested()
  @Type(() => TDec_0302a04Opc)
  pFCPST: TDec_0302a04Opc;

  @IsOptional()
  @ValidateNested()
  @Type(() => TDec_1302)
  vFCPST: TDec_1302;

  @IsOptional()
  @ValidateNested()
  @Type(() => TDec_1302)
  vICMSDeson: TDec_1302;

  @IsOptional()
  @IsString()
  @IsIn(['6', '7', '9'])
  motDesICMS: string;

  @IsOptional()
  @IsString()
  @IsIn(['0', '1'])
  indDeduzDeson: string;
}
