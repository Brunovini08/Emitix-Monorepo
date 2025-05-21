import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { TDec_1302 } from 'src/nfe/reusable/types/primitivies_types/TDec_1302';

export class ipiDevolDto {
  @IsNotEmpty({
    message: 'Valor do IPI devolvido',
  })
  @Type(() => TDec_1302)
  vIPIDevol: TDec_1302;
}
