import { IsString, Matches } from 'class-validator';

export class TDec_1110v {
  @IsString()
  @Matches(
    /^0|0\.[0-9]{1,10}|[1-9]{1}[0-9]{0,10}|[1-9]{1}[0-9]{0,10}(\.[0-9]{1,10})?$/,
    {
      message:
        'Tipo Decimal com até 11 dígitos inteiros, podendo ter de 1 até 10 decimais.',
    },
  )
  dec: string;
  // Valor decimal com até 11 dígitos inteiros e 10 dígitos decimais.
}
