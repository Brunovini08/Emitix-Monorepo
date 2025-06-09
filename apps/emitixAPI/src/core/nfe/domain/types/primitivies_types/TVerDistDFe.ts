import { Equals, IsNotEmpty } from "class-validator";

export class TVerDistDFe {
  @IsNotEmpty({
    message: 'O elemento versao não pode estar vazio'
  })
  @Equals('1.01')
  versao: string
}