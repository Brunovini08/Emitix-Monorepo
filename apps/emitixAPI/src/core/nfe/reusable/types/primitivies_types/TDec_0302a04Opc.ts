import { IsString, Matches } from 'class-validator';

export class TDec_0302a04Opc {
  @IsString()
  // Valor decimal com até 3 dígitos inteiros e 4 dígitos decimais.
  @Matches(/^(0|0\.[0-9]{2,4}|[1-9]{1}[0-9]{0,2}(\.[0-9]{2,4})?)$/, {
    message:
      'Tipo Decimal com até 3 dígitos inteiros, podendo ter de 2 até 4 decimais. Utilizados em TAGs opcionais, não aceita valor zero.',
  })
  dec: string;
}
