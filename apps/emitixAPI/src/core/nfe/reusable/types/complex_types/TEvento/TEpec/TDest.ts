import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";
import { TUf } from "../../../primitivies_types/TUf";
import { TCnpj } from "../../../primitivies_types/TCnpj";
import { TCpf } from "../../../primitivies_types/TCpf";
import { TIdEstrangeiro } from "../../../primitivies_types/TIdEstrangeiro";
import { TIe } from "../../../primitivies_types/TIe";
import { TDec_1302 } from "../../../primitivies_types/TDec_1302";

export class TDest {
  @IsNotEmpty({
    message: 'O elemento UF é obrigatório'
  })
  @Type(() => TUf)
  UF: TUf

  @IsOptional()
  @Type(() => TCnpj)
  CNPJ: TCnpj

  @IsOptional()
  @Type(() => TCpf)
  CPF: TCpf

  @IsOptional()
  @Type(() => TIdEstrangeiro)
  idEstrangeiro: TIdEstrangeiro

  @IsOptional()
  @Type(() => TIe)
  IE: TIe

  @IsNotEmpty({
    message: 'O elemento vNF é obrigatório'
  })
  @Type(() => TDec_1302)
  vNF: TDec_1302

  @IsNotEmpty({
    message: 'O elemento vICMS é obrigatório'
  })
  @Type(() => TDec_1302)
  vICMS: TDec_1302

  @IsNotEmpty({
    message: 'O elemento vST é obrigatório'
  })
  @Type(() => TDec_1302)
  vST: TDec_1302


}