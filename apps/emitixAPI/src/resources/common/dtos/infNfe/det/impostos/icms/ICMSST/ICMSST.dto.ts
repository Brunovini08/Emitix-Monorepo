import { Type } from 'class-transformer';
import { IsNotEmpty, IsEnum, IsString, IsOptional } from 'class-validator';
import { TDec_0302a04Opc } from 'src/core/nfe/reusable/types/primitivies_types/TDec_0302a04Opc';
import { TDec_1302 } from 'src/core/nfe/reusable/types/primitivies_types/TDec_1302';
import { TorigEnum } from 'src/core/nfe/reusable/types/primitivies_types/Torig';

export class ICMSSTDto {
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
    message: `Tributação pelo ICMS ST = Tributação com Diferimento`,
  })
  @IsEnum(['41', '60'], {
    message:
      'CST must be either "41" or "60", Tributação pelo ICMS 41 - Não tributado; 60 - CObrado anteriormente por substituição tributária',
  })
  @IsString()
  CST: string; // Código de Situação Tributária (CST) do ICMS (60)

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
  pFCPSTRet: TDec_0302a04Opc; // Alíquota do ICMS Substituição Tributária retido anteriormente (%)

  @IsOptional()
  @Type(() => TDec_1302)
  vFCPSTRet: TDec_1302; // Valor do ICMS Substituição Tributária retido anteriormente (R$)
}
