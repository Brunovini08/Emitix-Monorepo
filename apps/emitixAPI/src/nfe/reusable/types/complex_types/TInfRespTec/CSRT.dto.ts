import {
  IsBase64,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CSRTDTo {
  @IsNotEmpty({
    message: 'Identificador do CSRT utilizado para montar o hash do CSRT',
  })
  @IsString()
  @Matches(/[0-9]{2}^$/)
  idCSRT: string;

  @IsNotEmpty({
    message:
      'O hashCSRT é o resultado da função hash (SHA-1 - Base64) do CSRT fornecido pelo fisco mais a Chave de Acesso da NFe',
  })
  @IsBase64()
  @IsString()
  @Length(20)
  hashCSRT: string;
}
