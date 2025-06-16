import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import  { TDec_0302a04 } from 'src/core/nfe/domain/types/primitivies_types/TDec_0302a04';
import  { TDec_0302a04Opc } from 'src/core/nfe/domain/types/primitivies_types/TDec_0302a04Opc';
import  { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';
import  { TorigEnum } from 'src/core/nfe/domain/types/primitivies_types/Torig';

export class ICMS202Dto {
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
      202 - Tributada pelo Simples Naacional sem permissão de crédito e com cobrança
      do ICMS por Substituição Tributária; 203 - Isenção do ICMS nos Simples Nacional
      para faixa de receita bruta e com cobrança do ICMS por Substituição Tributária;
      
      203 - Isenção do ICMS nos Simples Nacional para faixa de receita bruta e com 
      cobrança do ICMS por Substituição Tributária
      `,
  })
  @IsEnum(['202', '203'], {
    message: `
            Código de Situação Tributária (CST) do ICMS (202 ou 203)
            `,
  })
  @IsString()
  CSOSN: string; // Código de Situação Tributária (CST) do ICMS (202)

  @IsNotEmpty({
    message: `
      Modalidade de determinação da BC do ICMS ST:
      0 - Preço tabelado ou máximo sugerido;
      1 - Lisa Negativa (valor);
      2 - Lista Positiva (valor);
      3 - Lista Neutra (valor);
      4 - Margem Valor Agregado (%);
      5 - Pauta (valor);
      6 - Valor da Operação
    `,
  })
  @IsString()
  @IsEnum(['0', '1', '2', '3', '4', '5', '6'], {
    message: `Modalidade de determinação da BC do ICMS ST:
      0 - Preço tabelado ou máximo sugerido;
      1 - Lisa Negativa (valor);
      2 - Lista Positiva (valor);
      3 - Lista Neutra (valor);
      4 - Margem Valor Agregado (%);
      5 - Pauta (valor);
      6 - Valor da Operação`,
  })
  modBCST: string; // Modalidade de determinação da BC do ICMS ST (0, 1, 2, 3, 4, 5 ou 6)

  @IsOptional()
  @Type(() => TDec_0302a04Opc)
  pMVAST: TDec_0302a04Opc; // Percentual da Margem de Valor Adicionado (%)

  @IsOptional()
  @Type(() => TDec_0302a04Opc)
  pRedBCST: TDec_0302a04Opc; // Percentual de redução da BC do ICMS ST (%)

  @IsOptional()
  @Type(() => TDec_1302)
  vBCST: TDec_1302; // Valor da BC do ICMS ST (R$)

  @IsNotEmpty({
    message: 'Alíquota do ICMS ST',
  })
  @Type(() => TDec_0302a04)
  pICMSST: TDec_0302a04; // Alíquota do ICMS ST (%)

  @IsNotEmpty({
    message: 'Valor do ICMS ST',
  })
  @Type(() => TDec_1302)
  vICMSST: TDec_1302; // Valor do ICMS ST (R$)

  @IsOptional()
  @Type(() => TDec_1302)
  vBCFCPST: TDec_1302; // Valor da BC do ICMS FCP (R$)

  @IsOptional()
  @Type(() => TDec_0302a04Opc)
  pFCPST: TDec_0302a04Opc; // Percentual do ICMS FCP ST (%)

  @IsOptional()
  @Type(() => TDec_1302)
  vFCPST: TDec_1302; // Valor do ICMS FCP ST (R$)
}
