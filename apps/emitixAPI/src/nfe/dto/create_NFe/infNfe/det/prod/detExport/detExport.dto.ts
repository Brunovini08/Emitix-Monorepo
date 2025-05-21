import { IsOptional, Length } from 'class-validator';

export class detExportDto {
  @IsOptional()
  @Length(1, 20)
  nDraw: string; //Número do ato concessório de Drawback

  @IsOptional()
  exportInd: string; //Exportação indireta

  @IsOptional()
  nRE: string; //Registro de exportação

  @IsOptional()
  chNFe: string; //Chave de acesso da NF-e recebida para exportação

  @IsOptional()
  qExport: string; //Quantidade do item efetivamente exportado
}
