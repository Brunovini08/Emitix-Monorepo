import { IsString, MaxLength, MinLength } from 'class-validator';

export class TMotivo {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  // Motivo da rejeição, com 1 a 255 caracteres alfanuméricos.
  motivo!: string;
}
