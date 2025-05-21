import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { TDec_1104v } from "../../../primitivies_types/TDec_1104v";

export class TItemPedido {
  @IsNotEmpty({
    message: 'O atributo numItem é obrigatório'
  })
  numItem: string

  @IsNotEmpty({
    message: 'O elemento qtdeItem é obrigatório'
  })
  @Type(() => TDec_1104v)
  qtdeItem: TDec_1104v
}