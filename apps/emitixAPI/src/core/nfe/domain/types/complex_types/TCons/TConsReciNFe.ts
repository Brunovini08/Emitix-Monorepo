import { IsIn, IsNotEmpty } from "class-validator";
import type { TUf } from "../../primitivies_types/TUf";

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
  
  @IsNotEmpty({
    message: 'O campo "versao" é obrigatório',
  })
  @IsIn(['4.00'], {
    message: 'O campo "versao" deve ser 4.00',
  })
  versao: string;

  @IsNotEmpty({
    message: 'O campo "UF" é obrigatório'
  })
  uf: TUf;
}