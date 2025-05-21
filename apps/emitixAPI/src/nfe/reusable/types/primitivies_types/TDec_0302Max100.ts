import { IsString, Matches } from 'class-validator';

export class TDec_0302Max100 {
  @IsString()
  // Valor decimal com até 3 dígitos inteiros e 2 dígitos decimais, podendo ter valor máximo de 100,00.
  @Matches(
    /^0(\.[0-9]{2})?$|^100(\.00)?$|^[1-9]{1}[0-9]{0, 1}?(\.[0-9]{2})?$/,
    {
      message:
        'Tipo Decimal com até 3 dígitos inteiros e 2 decimais, podendo ter valor máximo de 100,00.',
    },
  )
  dec: string;
}
