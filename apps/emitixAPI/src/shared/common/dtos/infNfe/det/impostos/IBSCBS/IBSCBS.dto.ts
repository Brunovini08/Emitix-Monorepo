import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';

export class IBSCBSDto {
  @IsNotEmpty({
    message: 'Valor da dedução é obrigatório',
  })
  @Type(() => TDec_1302)
  vDed: TDec_1302;

  @IsNotEmpty({
    message: 'Valor dos fornecimentos é obrigatório',
  })
  @Type(() => TDec_1302)
  vFor: TDec_1302;

  @IsNotEmpty({
    message: 'Valor total das deduções é obrigatório',
  })
  @Type(() => TDec_1302)
  vTotDed: TDec_1302;

  @IsNotEmpty({
    message: 'Valor líquido dos fornecimentos é obrigatório',
  })
  @Type(() => TDec_1302)
  vLiqFor: TDec_1302;
}  