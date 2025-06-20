import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { baseCalcDto } from './baseCalc.dto';
import { quantDto } from './quant.dto';
import { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';

export class cofinsOutrDto {
  @IsNotEmpty({
    message: `
      Código de Situação Tributária do COFINS: 
      49 - Outras Operações de Saída 
      50 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Tributada no Mercado Interno
      51 - Operação com Direito a Crédito – Vinculada Exclusivamente a Receita Não Tributada no Mercado Interno 
      52 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita de Exportação 
      53 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno 
      54 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas no Mercado Interno e de Exportação 
      55 - Operação com Direito a Crédito - Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação 
      56 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno, e de Exportação 
      60 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Tributada no Mercado Interno
      61 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno 
      62 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita de Exportação 
      63 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno 
      64 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas no Mercado Interno e de Exportação 
      65 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação 
      66 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno, e de Exportação 
      67 - Crédito Presumido - Outras Operações 
      70 - Operação de Aquisição sem Direito a Crédito 
      71 - Operação de Aquisição com Isenção 
      72 - Operação de Aquisição com Suspensão 
      73 - Operação de Aquisição a Alíquota Zero 
      74 - Operação de Aquisição sem Incidência da Contribuição 
      75 - Operação de Aquisição por Substituição Tributária 
      98 - Outras Operações de Entrada 
      99 - Outras Operações.
    `,
  })
  @IsString()
  @IsIn([
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '60',
    '61',
    '62',
    '63',
    '64',
    '65',
    '66',
    '67',
    '70',
    '71',
    '72',
    '73',
    '74',
    '75',
    '98',
    '99',
  ])
  CST: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => baseCalcDto)
  baseCalc: baseCalcDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => quantDto)
  quant: quantDto;

  @IsNotEmpty({
    message: 'Valor do COFINS',
  })
  @Type(() => TDec_1302)
  vCOFINS: TDec_1302;
}
