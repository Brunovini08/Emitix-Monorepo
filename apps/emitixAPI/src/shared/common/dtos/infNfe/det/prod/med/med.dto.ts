import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import  { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';
import  { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';

export class medDto {
  @IsNotEmpty({
    message:
      'Utilizar o número do registro ANVISA ou preencher com o literal "ISENTO", no caso de medicamento isento de registro na ANVISA',
  })
  @Type(() => TString)
  @Matches(/^[0-9]{11}|[0-9]{13}|ISENTO" $/)
  cProdANVISA: TString;

  @IsOptional()
  @MinLength(1)
  @MaxLength(255)
  @Type(() => TString)
  xMotivoIsencao: TString;

  @IsNotEmpty({
    message: 'Preço Máximo ao Consumidor',
  })
  @Type(() => TDec_1302)
  vPMC: TDec_1302;
}
