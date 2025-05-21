import { IsString, Matches } from 'class-validator';

export class TDec_1204Opc {
  @IsString()
  @Matches(
    /^0\.[0-9]{1,4}|[1-9]{1}[0-9]{0,11}|[1-9]{1}[0-9]{0,11}(\.[0-9]{1,4})?$/,
    {
      message:
        'Tipo Decimal com até 12 dígitos inteiros, podendo ter de 1 até 4 decimais.',
    },
  )
  // Valor decimal com até 12 dígitos inteiros e 4 dígitos decimais.
  dec: string;
}
