import { Type } from 'class-transformer';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { TString } from 'src/core/nfe/domain/types/primitivies_types/TString';

export class lacresDto {
  @IsNotEmpty({
    message: 'Número dos Lacres',
  })
  @Type(() => TString)
  @MinLength(1)
  @MaxLength(60)
  nLacre: TString;
}
