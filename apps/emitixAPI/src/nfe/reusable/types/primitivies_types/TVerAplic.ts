import { IsString, MaxLength, MinLength } from 'class-validator';

export class TVerAplic {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  // Versão do aplicativo, com 1 a 20 caracteres alfanuméricos.
  verAplic!: string;
}
