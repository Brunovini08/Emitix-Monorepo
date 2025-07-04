import { ArrayMaxSize, ArrayMinSize, IsArray, IsIn, IsNotEmpty, IsNotEmptyObject, Length } from "class-validator";
import type { TItemPedido } from "./TItemPedido";

export class TPedido_Prorrog {
  @IsNotEmpty({
    message: 'O atributo versao é obrigatório'
  })
  versao: string

  @IsNotEmpty({
    message: 'O elemento descEvento é obrigatório'
  })
  @IsIn(["Pedido de Prorrogação", "Pedido de Prorrogacao"])
  descEvento: string

  @IsNotEmpty({
    message: 'O elemento nProt é obrigatório'
  })
  @Length(15, 15)
  nProt: string

  @IsNotEmptyObject()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(990)
  itemPedido: TItemPedido[]
}