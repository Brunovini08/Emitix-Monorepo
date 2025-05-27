import { Type } from 'class-transformer';
import {
  Equals,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { TDec_0302a04 } from 'src/core/nfe/reusable/types/primitivies_types/TDec_0302a04';
import { TDec_0302a04Max100 } from 'src/core/nfe/reusable/types/primitivies_types/TDec_0302a04Max100';
import { TDec_0302a04Opc } from 'src/core/nfe/reusable/types/primitivies_types/TDec_0302a04Opc';
import { TDec_1302 } from 'src/core/nfe/reusable/types/primitivies_types/TDec_1302';
import { TorigEnum } from 'src/core/nfe/reusable/types/primitivies_types/Torig';

export class ICMS51Dto {
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
    message: `Tributação pelo ICMS 51 = Tributação com Diferimento`,
  })
  @Equals('51')
  @IsString()
  CST: string; // Código de Situação Tributária (CST) do ICMS (40)

  @IsOptional()
  @IsString()
  @IsIn(['0', '1', '2', '3'])
  modBC: string;

  @IsOptional()
  @Type(() => TDec_0302a04)
  pRedBC: TDec_0302a04;

  @IsOptional()
  @IsString()
  @Matches(/^[!-ÿ]{8}|[!-ÿ]{10}$/)
  cBenefRBC: string;

  @IsOptional()
  @Type(() => TDec_1302)
  vBC: TDec_1302;

  @IsOptional()
  @Type(() => TDec_0302a04)
  pICMS: TDec_0302a04;

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSp: TDec_1302;

  @IsOptional()
  @Type(() => TDec_0302a04Max100)
  pDif: TDec_0302a04Max100;

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSDif: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  vICMS: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  vBCFCP: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  vFCP: TDec_1302;

  @IsOptional()
  @Type(() => TDec_0302a04Opc)
  pFCPDif: TDec_0302a04Opc;

  @IsOptional()
  @Type(() => TDec_1302)
  vFCPDif: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  vFCPEfet: TDec_1302;
}
