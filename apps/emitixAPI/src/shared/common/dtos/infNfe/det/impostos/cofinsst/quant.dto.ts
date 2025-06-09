import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { TDec_1104 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1104';
import { TDec_1204 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1204';

export class quantoDto {
  @IsNotEmpty({
    message: 'Quantidade Vendida',
  })
  @Type(() => TDec_1204)
  qBCProd: TDec_1204;

  @IsNotEmpty({
    message: 'Alíquota do COFINS ST(em reais)',
  })
  @Type(() => TDec_1104)
  vAliqProd: TDec_1104;
}
