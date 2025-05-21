import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TDec_0302a04 } from 'src/nfe/reusable/types/primitivies_types/TDec_0302a04';
import { TDec_0302a04Opc } from 'src/nfe/reusable/types/primitivies_types/TDec_0302a04Opc';
import { TDec_1302 } from 'src/nfe/reusable/types/primitivies_types/TDec_1302';
import { TorigEnum } from 'src/nfe/reusable/types/primitivies_types/Torig';

export class ICMS900Dto {
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
  @IsString()
  @IsEnum(['0', '1', '2', '3'], {
    message: `
          Modalidade de determinação da BC do ICMS:
          0 - Margem Valor Agregado (%);
          1 - Pauta (valor);
          2 - Preço Tabelado Máximo (valor);
          3 - Valor da Operação.
        `,
  })
  modBC: string; // Modalidade de determinação da BC do ICMS (0, 1, 2 ou 3)

  @IsOptional()
  @Type(() => TDec_1302)
  vBC: TDec_1302; // Valor da BC do ICMS (R$)

  @IsOptional()
  @Type(() => TDec_0302a04Opc)
  pRedBC: TDec_0302a04Opc; // Percentual de redução da BC (%)

  @IsOptional()
  @Type(() => TDec_0302a04)
  pICMS: TDec_0302a04; // Alíquota do ICMS (%)

  @IsOptional()
  @Type(() => TDec_1302)
  vICMS: TDec_1302; // Valor do ICMS (R$)

  @IsOptional()
  @IsString()
  @IsEnum(['0', '1', '2', '3', '4', '5', '6'], {
    message: `
        Modalidade de determinação da BC do ICMS ST:
        0 - Preço tabelado o máximo sugerido;
        1 - Lista Negativa (valor);
        2 - Lista Positiva (valor);
        3 - Lista Neutra (valor);
        4 - Margem Valro Agregado;
        5 - Pauta (valor);
        6 - Valor da Operação.
        `,
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

  @IsOptional()
  @Type(() => TDec_0302a04)
  pICMSST: TDec_0302a04; // Alíquota do ICMS ST (%)

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSST: TDec_1302; // Valor do ICMS ST (R$)

  @IsOptional()
  @Type(() => TDec_1302)
  VBCFCPST: TDec_1302; // Valor da BC do ICMS FCP (R$)

  @IsOptional()
  @Type(() => TDec_0302a04Opc)
  pFCPST: TDec_0302a04Opc; // Alíquota do ICMS FCP (%)

  @IsOptional()
  @Type(() => TDec_0302a04)
  pCredSN: TDec_0302a04; // Percentual do crédito de ICMS (%)

  @IsOptional()
  @Type(() => TDec_1302)
  vCredICMSSN: TDec_1302; // Valor do crédito de ICMS (R$)
}
