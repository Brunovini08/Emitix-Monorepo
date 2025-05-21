import { IsString, Matches } from 'class-validator';

export class TDec_1203 {
  @IsString()
  @Matches(/^(0|0\.[0-9]{3}|[1-9]{1}[0-9]{0,11}(\.[0-9]{3})?)$/, {
    message: 'Tipo Decimal com até 12 dígitos inteiros e 3 decimais.',
  })
  // Valor decimal com até 12 dígitos inteiros e 3 dígitos decimais.
  dec: string;
}
