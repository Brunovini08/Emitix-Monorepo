import { IsString, Matches } from 'class-validator';

export class TDec_0302a04Max100 {
  // Valor decimal com até 3 dígitos inteiros e 2 dígitos decimais, podendo ter valor máximo de 100,00.
  @IsString()
  @Matches(
    /^0(\.[0-9]{2,4})?|[1-9]{1}[0-9]{0,1}(\.[0-9]{2,4})?|100(\.0{2,4})?$/,
    {
      message:
        'Tipo Decimal com 3 inteiros (no máximo 100), com até 4 decimais',
    },
  )
  dec: string;
}
