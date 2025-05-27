import { Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { TDec_0302a04 } from 'src/core/nfe/reusable/types/primitivies_types/TDec_0302a04';
import { TDec_1302 } from 'src/core/nfe/reusable/types/primitivies_types/TDec_1302';

export class confinsAliqDto {
  @IsNotEmpty({
    message:
      'Código de Situação Tributária do COFINS. 01 - Operação Tributável - Base de Cálculo = Valor da Operação Alíquota Normal (Cumulativo/Não Cumulativo); 02 - Operação Tributável - Base de Cálculo = Valor da Operação (Alíquota Diferenciada)',
  })
  @IsString()
  @IsIn(['01', '02'])
  CST: string;

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

  @IsNotEmpty({
    message: 'Valor do COFINS',
  })
  @Type(() => TDec_1302)
  vCOFINS: TDec_1302;
}
