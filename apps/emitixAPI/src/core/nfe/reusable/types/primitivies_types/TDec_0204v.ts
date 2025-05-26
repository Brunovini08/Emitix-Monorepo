import { IsString, Matches } from 'class-validator';

export class TDec_0204v {
  @IsString()
  @Matches(/^0|0\.[0-9]{1, 4}|[1-9]{1}[0-9]{0, 1}(\.[0-9]{1, 4})?$/, {
    message:
      'Tipo Decimal com até 2 dígitos inteiros, podendo ter de 1 até 4 dígitos decimais.',
  })
  // Valor decimal com até 2 dígitos inteiros, podendo ter de 1 até 4 dígitos decimais.
  dec: string;
}
