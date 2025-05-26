import { IsEnum, IsString } from 'class-validator';

enum TAmbEnum {
  PROD = '1',
  HOM = '2',
}

export class TAmb {
  @IsString()
  // Ambiente da NF-e, onde:
  // 1 - Produção
  // 2 - Homologação
  @IsEnum(TAmbEnum, {
    message: `O ambiente da NF-e deve ser um dos seguintes valores: ${Object.values(TAmbEnum).join(', ')}.`,
  })
  amb!: TAmbEnum;
}
