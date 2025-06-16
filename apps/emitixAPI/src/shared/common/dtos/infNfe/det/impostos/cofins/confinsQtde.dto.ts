import { Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import  { TDec_1104v } from 'src/core/nfe/domain/types/primitivies_types/TDec_1104v';
import  { TDec_1204v } from 'src/core/nfe/domain/types/primitivies_types/TDec_1204v';
import  { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';

export class confinsQtdeDto {
  @IsNotEmpty({
    message:
      'Código de Situação Tributária do COFINS. 03 - Operação Tributável - Base de Cálculo = Quantidade Vendida x Alíquota por Unidade de Produto;',
  })
  @IsString()
  @IsIn(['03'])
  CST: string;

  @IsNotEmpty({
    message: 'Quantidade Vendida',
  })
  @Type(() => TDec_1204v)
  qBCProd: TDec_1204v;

  @IsNotEmpty({
    message: 'Alíquota do COFINS (em reais)',
  })
  @Type(() => TDec_1104v)
  vAliqProd: TDec_1104v;

  @IsNotEmpty({
    message: 'Valor do COFINS',
  })
  @Type(() => TDec_1302)
  vCOFINS: TDec_1302;
}
