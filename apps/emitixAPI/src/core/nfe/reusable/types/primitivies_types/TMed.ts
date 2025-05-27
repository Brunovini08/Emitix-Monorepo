import { IsString, Matches } from 'class-validator';

export class TMed {
  @IsString()
  @Matches(/^[0-9]{1, 4}$/, {
    message: 'O tempo médio em segundos deve ter de 1 a 4 dígitos numéricos.',
  })
  // Tempo médio em segundos, com 1 a 4 dígitos numéricos.
  med!: string;
}
