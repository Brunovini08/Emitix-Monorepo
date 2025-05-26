import { IsString, Matches } from 'class-validator';

export class TDec_1204temperatura {
  @IsString()
  @Matches(
    /^0\.[1-9]{1}[0-9]{3}|0\.[0-9]{3}[1-9]{1}|0\.[0-9]{2}[1-9]{1}[0-9]{1}|0\.[0-9]{1}[1-9]{1}[0-9]{2}|[1-9]{1}[0-9]{0,11}(\.[0-9]{4})?$/,
    {
      message: 'Tipo Decimal com até 12 dígitos inteiros e 4 decimais.',
    },
  )
  // Valor decimal com até 12 dígitos inteiros e 4 dígitos decimais.
  dec: string;
}
