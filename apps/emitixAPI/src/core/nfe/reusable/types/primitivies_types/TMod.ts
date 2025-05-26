import { IsEnum, IsString } from 'class-validator';

enum TModEnum {
  // Código do modelo do documento fiscal. Para NF-e, o valor deve ser "55".
  // Para NFC-e, o valor deve ser "65".
  NF_E = '55',
  NFC_E = '65',
}

export class TMod {
  @IsString()
  // Código do modelo do documento fiscal. Para NF-e, o valor deve ser "55".
  // Para NFC-e, o valor deve ser "65".
  @IsEnum(TModEnum, {
    message: `O modelo do documento fiscal deve ser um dos seguintes valores: ${Object.values(TModEnum).join(', ')}.`,
  })
  mod!: TModEnum;
}
