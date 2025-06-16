import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import  { TDec_0302a04 } from 'src/core/nfe/domain/types/primitivies_types/TDec_0302a04';
import  { TDec_1302Opc } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302Opc';

export class baseCalcDto {
  @IsNotEmpty({
    message: 'Valor da BC do PIS ST',
  })
  @Type(() => TDec_1302Opc)
  vBC: TDec_1302Opc;

  @IsNotEmpty({
    message: 'Alíquota do PIS ST (em percentual)',
  })
  @Type(() => TDec_0302a04)
  pPis: TDec_0302a04;
}
