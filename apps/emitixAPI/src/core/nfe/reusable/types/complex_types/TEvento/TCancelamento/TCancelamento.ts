import { Equals, IsIn, IsNotEmpty, Length } from "class-validator";

export class TCancelamento {
  @IsNotEmpty({
    message: 'O elemento descEvento é obrigatório'
  })
  @IsIn(['Cancelamento', 'Cancelamento por substituicao'])
  descEvento: string

  @IsNotEmpty({
    message: 'O elemento nProt é obrigatório'
  })
  nProt: string

  @IsNotEmpty({
    message: 'O elemento xJust é obrigatório'
  })
  xJust: string
}

//tp Evento = 110111 || 110112
// Evento de cancelamento de NF-e
// Evento de cancelamento por substituição