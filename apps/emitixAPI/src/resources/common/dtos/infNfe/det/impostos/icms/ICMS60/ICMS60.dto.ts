import { Type } from 'class-transformer';

import {
  Equals,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TDec_0302a04Opc } from 'src/core/nfe/reusable/types/primitivies_types/TDec_0302a04Opc';
import { TDec_1302 } from 'src/core/nfe/reusable/types/primitivies_types/TDec_1302';
import { TorigEnum } from 'src/core/nfe/reusable/types/primitivies_types/Torig';

export class ICMS60Dto {
  @IsNotEmpty()
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
    message: `Tributação pelo ICMS 60 = Tributação com Diferimento`,
  })
  @Equals('60')
  @IsString()
  CST: string; // Código de Situação Tributária (CST) do ICMS (40)

  @IsOptional()
  @Type(() => TDec_1302)
  vBCSTRet: TDec_1302; // Valor da BC do ICMS Substituição Tributária retido anteriormente R$)

  @IsOptional()
  @Type(() => TDec_0302a04Opc)
  pST: TDec_0302a04Opc; // Alíquota suportada pelo consumidor final

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSSubstituto: TDec_1302; // Valor do ICMS Substituição Tributária retido anteriormente (R$)

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSSTRet: TDec_1302; // Valor do ICMS Substituição Tributária retido anteriormente (R$)

  @IsOptional()
  @Type(() => TDec_1302)
  vBCFCPSTRet: TDec_1302; // Valor da BC do ICMS Substituição Tributária retido anteriormente (R$)

  @IsOptional()
  @Type(() => TDec_0302a04Opc)
  pFCPST: TDec_0302a04Opc; // Alíquota do ICMS Substituição Tributária retido anteriormente (%)

  @IsOptional()
  @Type(() => TDec_1302)
  vFCPSTRet: TDec_1302; // Valor do ICMS Substituição Tributária retido anteriormente (R$)

  @IsOptional()
  @Type(() => TDec_0302a04Opc)
  pRedBCEfet: TDec_0302a04Opc; // Alíquota do ICMS Substituição Tributária retido anteriormente (%)

  @IsOptional()
  @Type(() => TDec_1302)
  vBCEfet: TDec_1302; // Valor da BC do ICMS Substituição Tributária retido anteriormente (R$)

  @IsOptional()
  @Type(() => TDec_0302a04Opc)
  pICMSEfet: TDec_0302a04Opc; // Alíquota do ICMS Substituição Tributária retido anteriormente (%)

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSEfet: TDec_1302; // Valor do ICMS Substituição Tributária retido anteriormente (R$)
}
