import { IsString, Matches } from 'class-validator';

export class TDec_1302 {
  @IsString()
  @Matches(/^0|0\.[0-9]{2}|[1-9]{1}[0-9]{0,12}(\.[0-9]{2})?$/, {
    message:
      'Tipo Decimal com até 13 dígitos inteiros, podendo ter 2 decimais, utlizado em tags opcionais.',
  })
  // Valor decimal com até 13 dígitos inteiros e 2 dígitos decimais.
  dec: string;
}
