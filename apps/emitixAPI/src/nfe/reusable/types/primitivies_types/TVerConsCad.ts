import { Equals, IsNotEmpty, IsString } from "class-validator";

export default class TVerConsCad {
  @IsString()
  @IsNotEmpty({
    message: 'Versão do serviço não pode ser vazia'
  })
  @Equals('2.00')
  versao: string
}