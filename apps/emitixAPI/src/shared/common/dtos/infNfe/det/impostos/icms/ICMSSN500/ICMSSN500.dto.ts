import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import  { TDec_0302a04Opc } from 'src/core/nfe/domain/types/primitivies_types/TDec_0302a04Opc';
import  { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';
import  { TorigEnum } from 'src/core/nfe/domain/types/primitivies_types/Torig';

export class ICMSSN500Dto {
  @IsNotEmpty()
  @IsEnum(TorigEnum, {
    message: `
              Origem da mercadoria: 
              0 - Nacional
              1 - Estrangeira - Importação direta
              2 - Estrangeira - Adquirida no mercado interno
              `,
  })
  orig: TorigEnum; // Origem da mercadoria

  @IsNotEmpty({
    message: `
        500 - ICMS cobrado anteriormente por substituição tributária ou por antecipação
        `,
  })
  @IsEnum(['202', '203'], {
    message: `
              Código de Situação Tributária (CST) do ICMS (202 ou 203)
              `,
  })
  @IsString()
  CSOSN: string; // Código de Situação Tributária (CST) do ICMS (202)

  @IsOptional()
  @Type(() => TDec_1302)
  vBCSTRet: TDec_1302; // Valor da BC do ICMS Substituição Tributária retido anteriormente (R$)

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
  pFCPSTRet: TDec_0302a04Opc; // Alíquota do ICMS Substituição Tributária retido anteriormente (%)

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
