/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { TString } from 'src/core/nfe/reusable/types/primitivies_types/TString';

export class infSolicNFFDto {
  @IsNotEmpty({
    message: 'Solicitação do pedido de emissão da NFF',
  })
  @Type(() => TString)
  @MinLength(2)
  @MaxLength(5000)
  xSolic: TString;
}
