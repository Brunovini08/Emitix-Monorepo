import { Type } from "class-transformer";
import { IsOptional, IsNotEmpty, Equals } from "class-validator";
import { TUf } from "./TUf";
import { TIe } from "./TIe";
import { TCnpjVar } from "./TCnpjVar";
import { TString } from "./TString";
import { TCpfVar } from "./TCpfVar";

export class TInfCons {
  @IsNotEmpty({
    message: 'O elemento xServ não pode ser vazio'
  })
  @Type(() => TString)
  @Equals('CONS-CAD')
  xServ: TString

  @IsNotEmpty({
    message: 'O elemento UF não pode ser vazio'
  })
  @Type(() => TUf)
  UF: TUf

  @IsOptional()
  @Type(() => TIe)
  IE: TIe

  @IsOptional()
  @Type(() => TCnpjVar)
  CNPJ: TCnpjVar

  @IsOptional()
  @Type(() => TCpfVar)
  CPF: TCpfVar
}