import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TString } from 'src/core/nfe/reusable/types/primitivies_types/TString';

export class armaDto {
  @IsNotEmpty({
    message:
      'Indicador do tipo de arma de fogo (0 - Uso permitido; 1 - Uso restrito)',
  })
  @IsString()
  @IsIn(['0', '1'])
  @IsNotEmpty({
    message: 'Número de série da arma',
  })
  @MinLength(1)
  @MaxLength(15)
  @Type(() => TString)
  nSerie: TString;

  @IsNotEmpty({
    message: 'Número de série do cano',
  })
  @MinLength(1)
  @MaxLength(15)
  @Type(() => TString)
  nCano: TString;

  @IsNotEmpty({
    message: `
      Descrição completa da arma, compreendendo:
      calibre, marca, capacidade, tipo de funcionamento, comprimento e demais elementos que permitam a sua perfeita identificação
    `,
  })
  @MinLength(1)
  @MaxLength(256)
  @Type(() => TString)
  descr: TString;
}
