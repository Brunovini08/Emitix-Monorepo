import { Type } from 'class-transformer';
import { Equals, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TDec_0302a04Opc } from 'src/nfe/reusable/types/primitivies_types/TDec_0302a04Opc';
import { TDec_1302 } from 'src/nfe/reusable/types/primitivies_types/TDec_1302';
import { TorigEnum } from 'src/nfe/reusable/types/primitivies_types/Torig';

export class ICMS101Dto {
  @IsNotEmpty()
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
    message: `101 - Tributada pelo Simples Nacional com permissão de crédito`,
  })
  @Equals('101')
  @IsString()
  CSOSN: string; // Código de Situação Tributária (CST) do ICMS (60)

  @IsNotEmpty({
    message: 'Alíquota aplicável de cálculo do crédito (Simples Nacional)',
  })
  @Type(() => TDec_0302a04Opc)
  pCredSN: TDec_0302a04Opc; // Alíquota aplicável de cálculo do crédito (Simples Nacional) (%)

  @IsNotEmpty({
    message:
      'Valor crédito do ICMS que pode ser aproveitado nos termos do art, 23 da LC 123 (Simples Nacional)',
  })
  @Type(() => TDec_1302)
  vCredICMSSN: TDec_1302; // Valor crédito do ICMS que pode ser aproveitado nos termos do art, 23 da LC 123 (Simples Nacional) (R$)
}
