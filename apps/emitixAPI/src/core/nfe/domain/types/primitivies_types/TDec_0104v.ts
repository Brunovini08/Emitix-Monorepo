import { IsString, Matches } from 'class-validator';

export class TDec_0104v {
  @IsString()
  @Matches(/^0|0\.[0-9]{1, 4}|[1-9]{1}(\.[1-9]{1, 4})?$/, {
    message:
      'O valor do decimal deve ser um número válido com até 4 casas decimais.',
  })
  // Valor decimal com até 4 casas decimais.
  dec: string;
}
