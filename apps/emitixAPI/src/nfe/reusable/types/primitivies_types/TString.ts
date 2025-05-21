import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class TString {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  @Matches(/^[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}$/)
  // Texto com 1 a 255 caracteres alfanuméricos.
  text!: string;
}
