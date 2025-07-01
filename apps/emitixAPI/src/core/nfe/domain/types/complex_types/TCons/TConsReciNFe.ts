import { IsIn, IsNotEmpty, IsOptional } from "class-validator";

export class TConsReciNFe {
  @IsNotEmpty({
    message: 'O campo "tpAmb" é obrigatório',
  })
  @IsIn(['1', '2'], {
    message: 'O campo "tpAmb" deve ser 1 ou 2',
  })
  tpAmb: string;

  @IsNotEmpty({
    message: 'O campo "nRec" é obrigatório',
  })
  nRec: string;
  
  @IsOptional()
  @IsIn(['4.00'], {
    message: 'O campo "versao" deve ser 4.00',
  })
  versao: string;

 
}