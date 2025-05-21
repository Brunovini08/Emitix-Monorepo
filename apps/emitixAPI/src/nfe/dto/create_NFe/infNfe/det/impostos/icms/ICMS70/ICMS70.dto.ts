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

export class ICMS70Dto {
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
    message: `Tributação pelo ICMS 70 = Tributação com Diferimento`,
  })
  @Equals('70')
  @IsString()
  CST: string; // Código de Situação Tributária (CST) do ICMS (70)

  @IsNotEmpty({
    message:
      'Modalidade de determinação da BC do ICMS: 0 0 Margem Valor Agregado (%); 1 - Pauta (Valor R$); 2 - Preço Tabelado Máximo (Valor R$); 3 - Valor da operação (Valor R$)',
  })
  @IsString()
  @IsIn(['0', '1', '2', '3'], {
    message: `Modalidade de determinação da BC do ICMS: 0 0 Margem Valor Agregado (%); 1 - Pauta (Valor R$); 2 - Preço Tabelado Máximo (Valor R$); 3 - Valor da operação (Valor R$)`,
  })
  modBC: string; // Modalidade de determinação da BC do ICMS (0, 1, 2 ou 3)

  @IsNotEmpty({
    message: 'Percentual de retução da BC',
  })
  @Type(() => TDec_0302a04)
  pRedBC: TDec_0302a04; // Percentual de redução da BC (%)

  @IsNotEmpty({
    message: 'Valor da BC do ICMS (R$)',
  })
  @Type(() => TDec_0302a04)
  vBC: TDec_0302a04; // Valor da BC do ICMS (R$)

  @IsNotEmpty({
    message: 'Alíquota do ICMS (%)',
  })
  @Type(() => TDec_0302a04)
  pICMS: TDec_0302a04; // Alíquota do ICMS (%)

  @IsNotEmpty({
    message: 'Valor do ICMS (R$)',
  })
  @Type(() => TDec_1302)
  vICMS: TDec_1302; // Valor do ICMS (R$)

  @IsOptional()
  @Type(() => TDec_1302)
  vBCFCP: TDec_1302; // Valor da BC do ICMS FCP (R$)

  @IsOptional()
  @Type(() => TDec_1302)
  vFCP: TDec_1302; // Valor do ICMS FCP (R$)

  @IsOptional()
  @IsString()
  @IsIn(['0', '1', '2', '3', '4', '5', '6'], {
    message: `Modalidade de determinação da BC do ICMS ST: 0 - Preço tabelado ou máximo sugerido; 1 - Lista Negativa (valor); 2 - Lista Positiva (valor); 3 - Lista Neutra(valor); 4 - Margem Valor Agregado (%); 5 - Pauta (valor); 6 - Valor da Operação`,
  })
  modBCST: string; // Modalidade de determinação da BC do ICMS ST (0, 1, 2, 3, 4, 5 ou 6)

  @IsOptional()
  @Type(() => TDec_0302a04Opc)
  pMVAST: TDec_0302a04Opc; // Percentual da Margem de Valor Adicionado ICMS ST

  @IsOptional()
  @Type(() => TDec_0302a04Opc)
  pRedBCST: TDec_0302a04Opc; // Percentual de redução da BC ICMS ST

  @IsOptional()
  @Type(() => TDec_1302)
  vBCST: TDec_1302; // Valor da BC do ICMS ST (R$)

  @IsOptional()
  @Type(() => TDec_0302a04)
  pICMSST: TDec_0302a04; // Alíquota do ICMS ST (%)

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSST: TDec_1302; // Valor do ICMS ST (R$)

  @IsOptional()
  @Type(() => TDec_1302)
  vBCFCPST: TDec_1302; // Valor da BC do ICMS FCP ST (R$)

  @IsOptional()
  @Type(() => TDec_0302a04Opc)
  pFCPST: TDec_0302a04Opc; // Percentual do ICMS FCP ST (%)

  @IsOptional()
  @Type(() => TDec_1302)
  vFCPST: TDec_1302; // Valor do ICMS FCP ST (R$)

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSDeson: TDec_1302; // Valor do ICMS desonerado (R$)

  @IsOptional()
  @IsString()
  @IsIn(['3', '9', '12'], {
    message: `Motivo da desoneração do ICMS: 3 - Uso na agropecuária; 9 - Outros; 12 - Fomento agropecuário`,
  })
  motDesICMS: string; // Motivo da desoneração do ICMS (3, 9 ou 12)

  @IsOptional()
  @IsString()
  @IsIn(['0', '1'], {
    message:
      'Indica se o valor do ICMS desonerado (vICMSDeson) deduz do valor do item (vProd): 0 = Valor do ICMS desonerado (vICMSDeson) não deduz do valor do item (vProd) / total da NF-e; 1 = Valor do ICMS desonerado (vICMSDeson) deduz do valor di item (vProd) / totak da NF-e',
  })
  indDeduzDeson: string;

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSSTDeson: TDec_1302; // Valor do ICMS ST desonerado (R$)

  @IsOptional()
  @IsString()
  @IsIn(['0', '3', '12'], {
    message: `Motivo da desoneração do ICMS ST: 0 - Outros; 3 - Uso na agropecuária; 12 - Fomento agropecuário`,
  })
  motDesICMSST: string; // Motivo da desoneração do ICMS ST (0, 3 ou 12)
}
