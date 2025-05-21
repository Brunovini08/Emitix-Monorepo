import { IsIn, IsNotEmpty, IsOptional } from "class-validator";

export class TMani_Dest {
  @IsNotEmpty({
    message: 'O atributo versao é obrigatório'
  })
  versao: string

  @IsNotEmpty({
    message: 'O elemento descEvnto é obrigatório'
  })
  @IsIn(["Confirmacao da Operacao", "Ciencia da Operacao", "Desconhecimento da Operacao", "Operacao nao Realizada"])
  descEvento: string

  @IsOptional()
  xJust: string
}