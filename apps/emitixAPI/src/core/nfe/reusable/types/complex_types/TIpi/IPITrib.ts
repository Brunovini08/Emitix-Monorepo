import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { TDec_1302 } from '../../primitivies_types/TDec_1302';
import { TDec_0302a04 } from '../../primitivies_types/TDec_0302a04';
import { TDec_1204v } from '../../primitivies_types/TDec_1204v';
import { TDec_1104 } from '../../primitivies_types/TDec_1104';

export class IPITrib {
  @IsOptional({
    message:
      'Código da Situação Tributária do IPI: 00 - Entrada com recuperação de crédito; 49 - Outras entradas; 50 - Saída tributada; 99 - Outras saídas',
  })
  @IsString()
  @IsIn(['00', '49', '50', '00'])
  CST: string;

  @IsOptional({
    message: 'Valor da BC do IPI',
  })
  @ValidateNested()
  @Type(() => TDec_1302)
  vBC: TDec_1302;

  @IsOptional({
    message: 'Alíquota do IPI',
  })
  @ValidateNested()
  @Type(() => TDec_0302a04)
  pIPI: TDec_0302a04;

  @IsOptional()
  @ValidateNested()
  @Type(() => TDec_1204v)
  qUni: TDec_1204v;

  @IsOptional()
  @ValidateNested()
  @Type(() => TDec_1104)
  vUnid: TDec_1104;

  @IsNotEmpty({
    message: 'Valor do IPI',
  })
  @ValidateNested()
  @Type(() => TDec_1302)
  vIPI: TDec_1302;
}
