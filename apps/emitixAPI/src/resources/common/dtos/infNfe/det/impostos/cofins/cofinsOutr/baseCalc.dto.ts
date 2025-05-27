import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { TDec_0302a04 } from 'src/core/nfe/reusable/types/primitivies_types/TDec_0302a04';
import { TDec_1302 } from 'src/core/nfe/reusable/types/primitivies_types/TDec_1302';

export class baseCalcDto {
  @IsNotEmpty({
    message: 'Valor da BC do COFINS',
  })
  @Type(() => TDec_1302)
  vBC: TDec_1302;

  @IsNotEmpty({
    message: 'Alíquota do COFINS (em percentual)',
  })
  @Type(() => TDec_0302a04)
  pCOFINS: TDec_0302a04;
}
