import { IsString, Matches } from 'class-validator';

export class TDec_1104Opc {
  @IsString()
  @Matches(
    /^0\.[1-9]{1}[0-9]{3}|0\.[0-9]{3}[1-9]{1}|0\.[0-9]{2}[1-9]{1}[0-9]{1}|0\.[0-9]{1}[1-9]{1}[0-9]{2}|[1-9]{1}[0-9]{0,10}(\.[0-9]{4})?$/,
    {
      message:
        'Tipo Decimal com até 11 dígitos inteiros, podendo ter de 1 até 4 decimais (utilizado em tags opcionais)',
    },
  )
  // Valor decimal com até 11 dígitos inteiros e 4 dígitos decimais.
  dec: string;
}
