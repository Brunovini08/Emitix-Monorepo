import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { TString } from 'src/core/nfe/reusable/types/primitivies_types/TString';
import { Type } from 'class-transformer';

export class obsFiscoDto {
  @IsNotEmpty({
    message: 'O campo xTexto é obrigatório',
  })
  @MinLength(1)
  @MaxLength(60)
  @Type(() => TString)
  xTexto: TString;

  @IsNotEmpty({
    message: 'O campo xCampo é obrigatório',
  })
  @MinLength(1)
  @MaxLength(20)
  @Type(() => TString)
  xCampo: TString;
}
