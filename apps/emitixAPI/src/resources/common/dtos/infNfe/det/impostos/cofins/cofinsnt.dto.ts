import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class cofinsNtDto {
  @IsNotEmpty({
    message: `
      Código de Situação Tributária do COFINS:
      04 - Operação Tributável - Tributação Monofásica - (Alíquota Zero);
      05 - Operação Tributável (ST); 
      06 - Operação Tributável - Alíquota Zero; 
      07 - Operação Isenta da contribuição;
      08 - Operação Sem Incidência da Contribuição;
      09 - Operação com suspensão da contribuição;
    `,
  })
  @IsString()
  @IsIn(['04', '05', '06', '07', '08', '09'])
  CST: string;
}
