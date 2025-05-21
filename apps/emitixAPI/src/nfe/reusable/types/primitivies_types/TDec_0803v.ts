import { IsString, Matches } from 'class-validator';

export class TDec_0803v {
  @IsString()
  @Matches(/^(0|0\.[0-9]{3}|[1-9]{1}[0-9]{0,7}(\.[0-9]{1,3})?)$/, {
    message: 'Tipo Decimal com até 8 dígitos inteiros e 3 decimais.',
  })
  // Valor decimal com até 8 dígitos inteiros e 3 dígitos decimais.
  dec: string;
}
