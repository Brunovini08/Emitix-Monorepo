import { IsString, Matches } from 'class-validator';

export class TDec_1302Opc {
  @IsString()
  @Matches(
    /^0\.[0-9]{1}[1-9]{1}|0\.[1-9]{1}[0-9]{1}|[1-9]{1}[0-9]{0,12}(\.[0-9]{2})?$/,
    {
      message: 'Tipo Decimal com até 12 dígitos inteiros e 2 decimais.',
    },
  )
  // Valor decimal com até 12 dígitos inteiros e 2 dígitos decimais.
  dec: string;
}
