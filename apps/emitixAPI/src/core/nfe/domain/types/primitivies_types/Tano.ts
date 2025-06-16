import { IsString, Matches } from 'class-validator';

export class Tano {
  @IsString()
  @Matches(/^[0-9]{2}$/, {
    message: 'O ano deve ter exatamente 2 dígitos numéricos.',
  })
  // Ano da NF-e, com 2 dígitos numéricos.
  ano!: string;
}
