import { IsNotEmpty, IsString, Matches } from "class-validator";

export class TCfop {
  @IsString()
  @IsNotEmpty({
    message: 'Tipo CFOP'
  })
  @Matches(/^[123567] [0-9]([0-9] [1-9] | [1-9][0-9])$/)
  cfop: string
}