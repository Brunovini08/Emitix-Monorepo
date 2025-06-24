import { IsOptional, Length, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { exportIndDto } from './exportInd/exportIndDto';

export class detExportDto {
  @IsOptional()
  @Length(1, 20)
  nDraw: string; //Número do ato concessório de Drawback

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => exportIndDto)
  exportInd: exportIndDto[]; 

  @IsOptional()
  nRE: string; //Registro de exportação

  @IsOptional()
  chNFe: string; //Chave de acesso da NF-e recebida para exportação

  @IsOptional()
  qExport: string; //Quantidade do item efetivamente exportado
}
