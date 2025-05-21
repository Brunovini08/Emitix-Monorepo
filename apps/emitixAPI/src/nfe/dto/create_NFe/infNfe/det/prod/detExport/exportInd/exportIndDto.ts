import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { TChNFe } from 'src/nfe/reusable/types/primitivies_types/TChNFe';
import { TDec_1104v } from 'src/nfe/reusable/types/primitivies_types/TDec_1104v';

export class exportIndDto {
  @IsNotEmpty({
    message: 'Registro de exportação é obrigatório',
  })
  @IsString()
  @Matches(/^[0-9]{0,12}$/)
  nRE: string; //Registro de exportação

  @IsNotEmpty({
    message: 'Chave de acesso da NF-e recebida para exportação é obrigatório',
  })
  @Type(() => TChNFe)
  chNFe: TChNFe; //Chave de acesso da NF-e recebida para exportação

  @IsNotEmpty({
    message: 'Quantidade do item efetivamente exportado é obrigatória',
  })
  @Type(() => TDec_1104v)
  qExport: TDec_1104v; //Quantidade do item efetivamente exportado
}
