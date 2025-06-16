import { Type } from 'class-transformer';
import { Equals, IsNotEmpty, IsString } from 'class-validator';
import  { TDec_1104v } from 'src/core/nfe/domain/types/primitivies_types/TDec_1104v';
import  { TDec_1204v } from 'src/core/nfe/domain/types/primitivies_types/TDec_1204v';
import  { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';

export class pisQtdeDto {
  @IsNotEmpty({
    message:
      'Código de Situação Tributária do PIS. 03 - Operação Tributável - Base de Calculo = Quantidade Vendida X Alíquota por Unidade de Produto',
  })
  @IsString()
  @Equals('03')
  CST: string;

  @IsNotEmpty({
    message: 'Quantidade Vendida',
  })
  @Type(() => TDec_1204v)
  qBCProd: TDec_1204v;

  @IsNotEmpty({
    message: 'Alíquota do PIS (em reais)',
  })
  @Type(() => TDec_1104v)
  vAliqProd: TDec_1104v;

  @IsNotEmpty({
    message: 'Valor do PIS',
  })
  @Type(() => TDec_1302)
  vPIS: TDec_1302;
}
