import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { TDec_1104v } from 'src/core/nfe/reusable/types/primitivies_types/TDec_1104v';
import { TDec_1204v } from 'src/core/nfe/reusable/types/primitivies_types/TDec_1204v';

export class quantDto {
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
}
