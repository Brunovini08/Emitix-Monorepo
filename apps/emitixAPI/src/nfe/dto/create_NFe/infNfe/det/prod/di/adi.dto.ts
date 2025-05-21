import { IsOptional } from 'class-validator';

export class adiDto {
  @IsOptional()
  nAdicao: string; // Número da adição - Número da adição na DI (Declaração de Importação) - 7 dígitos

  @IsOptional()
  nSeqAdic: string; // Número da sequência da adição - Número da sequência da adição na DI (Declaração de Importação) - 3 dígitos

  @IsOptional()
  cFabricante: string; // Código do fabricante - Código do fabricante da mercadoria (opcional)

  @IsOptional()
  vDescDI: number; // Valor do desconto da DI - Valor do desconto aplicado na DI (Declaração de Importação) - 2 casas decimais

  @IsOptional()
  nDraw: string; // Número do ato concessório de drawback (opcional)
}
