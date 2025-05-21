import { IsString, Matches } from 'class-validator';

export class TTime {
  @IsString()
  @Matches(/^(([0-1][0-9])|([2][0-3])):([0-5][0-9]):([0-5][0-9])$/, {
    message: 'O horário deve estar no formato HH:MM:SS.',
  })
  time!: string;
}
