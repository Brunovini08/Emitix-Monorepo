import { IsString, Matches } from 'class-validator';

export class TDec_0304Max100 {
  @IsString()
  @Matches(/^0(\.[0-9]{4}?|100(\.00)?|[1-9]{1}[0-9]{0, 1}(\.[0-9]{4})?)$/, {
    message:
      'Tipo Decimal com até 3 dígitos inteiros e 4 decimais, podendo ter valor máximo de 100,00, não aceita valor zero.',
  })
  // Valor decimal com até 3 dígitos inteiros e 4 dígitos decimais, podendo ter valor máximo de 100,00.
  dec: string;
}
