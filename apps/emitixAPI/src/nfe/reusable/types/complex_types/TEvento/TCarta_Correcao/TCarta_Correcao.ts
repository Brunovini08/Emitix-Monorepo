import { Equals, IsIn, IsNotEmpty } from "class-validator";

export class TCarta_Correcao {
  @IsNotEmpty({
    message: 'O atributo versao é obrigatório'
  })
  versao: string

  @IsNotEmpty({
    message: 'O elemento descEvento é obrigatório: "Carta de Correção" ou "Carta de Correcao"'
  })
  @IsIn(["Carta de Correção", "Carta de Correcao"], {
    message: 'O campo deve ser preenchido com as seguintes informações: "Carta de Correção" ou "Carta de Correcao"'
  })
  descEvento: string

  @IsNotEmpty({
    message: 'O elemento xCondUso é obrigatório'
  })
  xCondUso: string
}