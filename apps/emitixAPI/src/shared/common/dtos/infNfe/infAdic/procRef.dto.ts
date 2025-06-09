import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';

export class procRefDto {
  @IsNotEmpty({
    message: 'Identifficador do processo ou ato concessório',
  })
  @Type(() => TString)
  @MinLength(1)
  @MaxLength(60)
  nProc: TString;

  @IsNotEmpty({
    message: `
        Origem do processo, informar com: 
        0 - SEFAZ;
        1 - Justiça Federal;
        2 - Justiça Estadual;
        3 - Secex/RFB;
        4 - CONFAZ; 
        9 - Outros.
      `,
  })
  @IsIn(['0', '1', '2', '3', '4', '9'])
  @IsString()
  indProc: string;

  @IsOptional()
  @IsString()
  @IsIn(['08', '10', '12', '14', '15'])
  tpAto: string;
}
