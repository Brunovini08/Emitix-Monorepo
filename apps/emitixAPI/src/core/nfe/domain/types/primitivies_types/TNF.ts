import { IsString, Matches } from 'class-validator';

export class TNF {
  @IsString()
  @Matches(/^[1-9]{1}[0-9]{0,8}$/, {
    message: 'O TNF deve ter entre 1 e 9 dígitos numéricos.',
  })
  // TNF (Número da Nota Fiscal), com 1 a 9 dígitos numéricos.
  tnf!: string;
}
