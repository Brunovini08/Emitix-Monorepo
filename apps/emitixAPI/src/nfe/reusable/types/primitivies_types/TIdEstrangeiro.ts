import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class TIdEstrangeiro {
  @IsNotEmpty({
    message: 'Identificação estrangeiro',
  })
  @Matches(/([!-ÿ]{0}|[!-ÿ]{5,20})?^$/)
  @IsString()
  idEstrangeiro: string;
}
