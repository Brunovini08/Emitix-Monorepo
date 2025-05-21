import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TorigEnum } from 'src/nfe/reusable/types/primitivies_types/Torig';

export class ICMSSN102Dto {
  @IsOptional()
  @IsEnum(TorigEnum, {
    message: `
           Origem da mercadoria: 
           0 - Nacional
           1 - Estrangeira - Importação direta
           2 - Estrangeira - Adquirida no mercado interno
           `,
  })
  orig: TorigEnum; // Origem da mercadoria

  @IsNotEmpty({
    message: `
      102 - Tributada pelo Simpls Nacional sem permissão de crédito.
      103 - Isenção do ICMS no Simples Nacional para faixa de receita bruta.
      300 - Imune.
      400 - Não tributada pelo Simples Nacional.
    `,
  })
  @IsIn(['102', '103', '300', '400'], {
    message: `
            Código de Situação Tributária (CST) do ICMS (102, 103, 300 ou 400)
            `,
  })
  @IsString()
  CSOSN: string; // Código de Situação Tributária (CST) do ICMS (102, 103, 300 ou 400)
}
