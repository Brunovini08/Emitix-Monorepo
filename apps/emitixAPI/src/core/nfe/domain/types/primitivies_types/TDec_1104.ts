import { IsString, Matches } from 'class-validator';

export class TDec_1104 {
  @IsString()
  @Matches(/^(0|0\.[0-9]{4}|[1-9]{1}[0-9]{0,10}(\.[0-9]{4})?)$/, {
    message: 'Tipo Decimal com até 11 dígitos inteiros, podendo ter 4 decimais',
  })
  // Valor decimal com até 11 dígitos inteiros e 4 dígitos decimais.
  dec: string;
}
