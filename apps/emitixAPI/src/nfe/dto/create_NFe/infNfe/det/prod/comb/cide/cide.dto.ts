import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { TDec_1104 } from 'src/nfe/reusable/types/primitivies_types/TDec_1104';
import { TDec_1204v } from 'src/nfe/reusable/types/primitivies_types/TDec_1204v';
import { TDec_1302 } from 'src/nfe/reusable/types/primitivies_types/TDec_1302';

export class cideDto {
  @IsNotEmpty({
    message: 'BC do CIDE (Quantidade comercializada)',
  })
  @Type(() => TDec_1204v)
  qBCProd: TDec_1204v; //BC do CIDE ( Quantidade comercializada)

  @IsNotEmpty({
    message: 'Aliquota do CIDE (em reais)',
  })
  @Type(() => TDec_1104)
  vAliqProd: TDec_1104; // Alíquota do CIDE  (em reais)

  @IsNotEmpty({
    message: 'Valor do CIDE é obrigatório',
  })
  @Type(() => TDec_1302)
  vCIDE: TDec_1302; // Valor do CIDE
}
