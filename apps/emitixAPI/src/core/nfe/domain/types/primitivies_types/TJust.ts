import { IsString, MaxLength, MinLength } from 'class-validator';

export class TJust {
  @IsString()
  @MinLength(15)
  @MaxLength(255)
  // Justificativa da rejeição, com 1 a 255 caracteres alfanuméricos.
  just!: string;
}
