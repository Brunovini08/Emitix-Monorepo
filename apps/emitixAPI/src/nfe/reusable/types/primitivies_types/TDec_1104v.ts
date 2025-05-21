import { IsString, Matches } from 'class-validator';

export class TDec_1104v {
  // Valor decimal com até 11 dígitos inteiros e 4 dígitos decimais.
  @IsString()
  @Matches(
    /^(0|0\.[0-9]{1, 4}|[1-9]{1}[0-9]{0, 10}|[0-9]{0, 10}(\.[0-9]{1, 4})?)$/,
    {
      message:
        'Tipo Decimal com até 11 dígitos inteiros, podendo ter de 1 até 4 decimais',
    },
  )
  dec: string;
}
