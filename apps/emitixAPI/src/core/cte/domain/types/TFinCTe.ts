import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class TFinCTe {
  @IsNotEmpty({
    message: 'Tipo Finalidade da CT-e é obrigatório'
  })
  @IsString()
  @IsIn(['0', '1', '3'], {
    message: 
    `
      Preencher com:
      0 - CT-e Normal;
      1 - CT-e de Complmento de Valores;
      3 - CT-e de Substituição
    `
  })
  tpcte: string

}