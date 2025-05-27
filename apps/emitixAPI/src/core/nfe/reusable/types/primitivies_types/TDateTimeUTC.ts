import { IsString, Matches } from 'class-validator';

export class TDateTimeUTC {
  @IsString()
  @Matches(
    /^(((20(([02468][048])|([13579][26]))-02-29))|(20[0-9][0-9])-((((0[1-9])|(1[0-2]))-((0[1-9])|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30)))))T(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d([\-,\+](0[0-9]|10|11):00|([\+](12):00))$/,
    {
      message:
        'A data e hora devem estar no formato YYYY-MM-DDTHH:MM:SS±HH:MM.',
    },
  )
  // Data e hora no formato YYYY-MM-DDTHH:MM:SS±HH:MM, onde YYYY é o ano, MM é o mês, DD é o dia, HH é a hora, MM são os minutos e SS são os segundos.
  // O fuso horário deve ser UTC, com deslocamento de +00:00 ou -00:00.
  // Exemplo: 2023-10-01T12:00:00+00:00 ou 2023-10-01T12:00:00-00:00
  dateTimeUTC!: string;
}
