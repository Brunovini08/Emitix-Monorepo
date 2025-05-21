import { IsString, Matches } from 'class-validator';

export class TSerie {
  // Série da NF-e, com 3 dígitos numéricos.
  @IsString()
  @Matches(/^[0-9]{3}/, {
    message: 'A série da NF-e deve ter 3 dígitos numéricos.',
  })
  serie: string;
}
