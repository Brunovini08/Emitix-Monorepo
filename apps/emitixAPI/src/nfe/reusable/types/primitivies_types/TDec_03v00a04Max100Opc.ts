import { IsString, Matches } from 'class-validator';

export class TDec_03v00a04Max100Opc {
  @IsString()
  // Valor decimal com até 3 dígitos inteiros (no máximo 100), com 4 decimais, não aceita valor zero.
  @Matches(
    /^0(\.[1-9][0-9]{0,3})|0(\.[0][1-9][0-9]{0,2})|0(\.[0][0][1-9][0-9]{0,1})|0(\.[0][0][0][1-9])|100(\.[0]{1,4})?|[1-9]{1}[0-9]{0,1}(\.[0-9]{1,4})?$/,
    {
      message:
        'Tipo Decimal com até 3 dígitos inteiros, podendo ter de 2 até 4 decimais, não aceita valor zero.',
    },
  )
  dec: string;
}
