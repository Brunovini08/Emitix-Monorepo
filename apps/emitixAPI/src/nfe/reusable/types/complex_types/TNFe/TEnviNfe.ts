import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { TIdLote } from '../../primitivies_types/TIdLote';
import { TIndSinc } from '../../primitivies_types/TIndSinc';
import type { TNFeDto } from './TNFe';
import { TVerNFe } from './TVerNFe';

export class TEnviNfe {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TIdLote)
  idLote: TIdLote;

  @IsNotEmpty({
    message: 'Indicador de processamento síncrono. 0=NÃO; 1=SIM=Síncrono',
  })
  @IsString()
  @IsEnum(TIndSinc)
  indSinc: TIndSinc;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  NFe: TNFeDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TVerNFe)
  versao: TVerNFe;
}
