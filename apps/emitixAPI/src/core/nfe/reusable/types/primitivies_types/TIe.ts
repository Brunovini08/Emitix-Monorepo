import { IsString, Matches, MaxLength } from 'class-validator';

export class TIe {
  @IsString()
  @MaxLength(14)
  @Matches(/^[0-9]{2, 14}|ISENTO$/, {
    message:
      'A IE do emitente deve ser "ISENTO" ou ter entre 2 e 14 dígitos numéricos.',
  })
  // Inscrição Estadual do emitente, com até 14 dígitos numéricos.
  ie!: string;
}
