import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { TAmb } from "../../primitivies_types/TAmb";
import { Type } from "class-transformer";
import { TCodUfIBGE } from "../../primitivies_types/TCodUfIBGE";
import { TCnpj } from "../../primitivies_types/TCnpj";
import { TCpf } from "../../primitivies_types/TCpf";
import { TDistNSU } from "./TDistNSU";
import { TConsChNFe } from "../TCons/TConsChNFe";
import { TVerDistDFe } from "../../primitivies_types/TVerDistDFe";

export class TDistDFeInt {
  @IsNotEmpty({
    message: 'O elemento tpAmb não pode estar vazio'
  })
  @Type(() => TAmb)
  tpAmb: TAmb

  @IsOptional()
  @IsNotEmpty({
    message: 'O elemento cUFAutor não pode estar vazio'
  })
  @Type(() => TCodUfIBGE)
  cUFAutor: TCodUfIBGE

  @IsOptional()
  @Type(() => TCnpj)
  CNPJ?: TCnpj

  @IsOptional()
  @Type(() => TCpf)
  CPF?: TCpf

  @IsOptional()
  @ValidateNested()
  @Type(() => TDistNSU)
  distNSU?: TDistNSU

  @IsOptional()
  @ValidateNested()
  @Type(() => TDistNSU)
  ultNSU?: TDistNSU

  @IsOptional()
  @ValidateNested()
  @Type(() => TConsChNFe)
  consChNFe?: TConsChNFe

  @IsNotEmpty({
    message: 'O elemento versao não pode estar vazio'
  })
  @Type(() => TVerDistDFe)
  versao: TVerDistDFe
}