import { Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { TDec_0302a04 } from 'src/core/nfe/reusable/types/primitivies_types/TDec_0302a04';
import { TDec_1104v } from 'src/core/nfe/reusable/types/primitivies_types/TDec_1104v';
import { TDec_1204v } from 'src/core/nfe/reusable/types/primitivies_types/TDec_1204v';
import { TDec_1302 } from 'src/core/nfe/reusable/types/primitivies_types/TDec_1302';

export class pisOutrDto {
  @IsNotEmpty({
    message: 'Código de Situação Tributária do PIS.99 - Outras Operações',
  })
  @IsString()
  @IsIn([
    '49',
    '50',
    '51',
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

  @IsNotEmpty({
    message: 'Valor da BC do PIS',
  })
  @Type(() => TDec_1302)
  vBC: TDec_1302;

  @IsNotEmpty({
    message: 'Alíquota do PIS (em percentual)',
  })
  @Type(() => TDec_0302a04)
  pPis: TDec_0302a04;

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
