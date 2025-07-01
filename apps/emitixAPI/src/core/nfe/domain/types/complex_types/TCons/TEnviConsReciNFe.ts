import { IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from "class-validator";
import { TConsReciNFe } from "./TConsReciNFe";
import { Type } from "class-transformer";
import type { TUf } from "../../primitivies_types/TUf";

export class TEnviConsReciNFe {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => TConsReciNFe)
  consReciNFe: TConsReciNFe

  @IsNotEmpty()
  @IsString()
  cnpj: string;

  @IsNotEmpty({
    message: 'O campo "UF" é obrigatório'
  })
  uf: TUf;
}