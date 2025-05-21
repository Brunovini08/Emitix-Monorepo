import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { TDec_1302 } from 'src/nfe/reusable/types/primitivies_types/TDec_1302';

export class IIDto {
  @IsNotEmpty({
    message: 'Base da BC do Imposto de Importação',
  })
  @Type(() => TDec_1302)
  vBC: TDec_1302;

  @IsNotEmpty({
    message: 'Valor das despesas aduaneiras',
  })
  @Type(() => TDec_1302)
  vDespAdu: TDec_1302;

  @IsNotEmpty({
    message: 'Valor do Imposto de Importação',
  })
  @Type(() => TDec_1302)
  vII: TDec_1302;

  @IsNotEmpty({
    message: 'Valor do Imposto sobre Operações Financeiras',
  })
  @Type(() => TDec_1302)
  vIOF: TDec_1302;
}
