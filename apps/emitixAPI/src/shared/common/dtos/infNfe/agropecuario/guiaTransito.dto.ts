import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';
import { TUfEmi } from 'src/core/nfe/domain/types/primitivies_types/TUfEmi';

export class guiaTransitoDto {
  @IsNotEmpty({
    message: `
        Tipo da Guia:
        1 - GTA;
        2- TTA;
        3 - DTA;
        4 - ATV;
        5 - PTV; 
        6 - GTV;
        7 - Guia Florestal (DOF, SisFlora - PA e MT, SIAM - MG)
      `,
  })
  @IsIn(['1', '2', '3', '4', '5', '6', '7'])
  @IsString()
  tpGuia: string;

  @IsNotEmpty()
  @Type(() => TUfEmi)
  UFGuia: TUfEmi;

  @IsOptional()
  @Type(() => TString)
  @MinLength(1)
  @MaxLength(9)
  serieGuia: TString;

  @IsNotEmpty({
    message: 'Número da Guia',
  })
  @IsString()
  @Matches(/^[0-9]{1,9}$/)
  nGuia: string;
}
