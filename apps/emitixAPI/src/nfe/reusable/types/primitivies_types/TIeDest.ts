import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class TIeDest {
  @IsOptional()
  @IsString()
  @MaxLength(14)
  @Matches(/^ISENTO|[0-9]{2,14}$/, {
    message:
      'A IE do destinatário deve ser "ISENTO" ou ter entre 2 e 14 dígitos numéricos.',
  })
  ieDest?: string;
}
