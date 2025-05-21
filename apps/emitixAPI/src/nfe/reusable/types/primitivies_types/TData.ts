import { IsString, Matches } from 'class-validator';

export class TData {
  @IsString()
  @Matches(
    /^(((20(([02468][048])|([13579][26]))-02-29))|(20[0-9][0-9])-((((0[1-9])|(1[0-2]))-((0[1-9])|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30)))))$/,
    {
      message: 'A data deve estar no formato YYYY-MM-DD e ser uma data válida.',
    },
  )
  // Data no formato YYYY-MM-DD, onde YYYY é o ano, MM é o mês e DD é o dia.
  data!: string;
}
