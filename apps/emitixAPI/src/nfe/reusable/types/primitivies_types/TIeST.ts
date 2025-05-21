import { IsString, Matches, MaxLength } from 'class-validator';

export class TIeST {
  @IsString()
  @MaxLength(14)
  @Matches(/^[0-9]{2,14}$/, {
    message:
      'A IE do ST do destinatário deve ter entre 2 e 14 dígitos numéricos.',
  })
  // Inscrição Estadual do Substituto Tributário do destinatário, com 2 a 14 dígitos numéricos.
  ieST!: string;
}
