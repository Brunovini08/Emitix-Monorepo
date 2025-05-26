import { Type } from "class-transformer";
import { Equals, IsIn, IsNotEmpty, IsNotEmptyObject, Length, ValidateNested } from "class-validator";
import { TDateTimeUTC } from "../../../primitivies_types/TDateTimeUTC";
import { TDest } from "./TDest";

export class TEpec {
  @IsNotEmpty({
    message: 'O atributo versao é obrigatório'
  })
  versao: string

  @IsNotEmpty({
    message: 'O elemento descEvento é obrigatório'
  })
  @Equals("EPEC", {
    message: "O valor do elemento descEvento = EPEC"
  })
  @Length(4, 4, {
    message: "O elemento EPEC contém 4 caracteres"
  })
  descEvento: string

  @IsNotEmpty({
    message: 'O elemento cOrgaoAutor é obrigatório'
  })
  cOrgaoAutor: string

  @IsNotEmpty({
    message: 'O elemento tpAutor é obrigatório'
  })
  @IsIn(["1"], {
    message: 'O valor do elemento tpAutor nesse evento, é 1 = EmpresaEmitente'
  })
  tpAutor: string

  @IsNotEmpty({
    message: 'O elemento verAplic é obrigatório'
  })
  verAplic: string

  @IsNotEmpty({
    message: 'O elemento dhEmi é obrigatório'
  })
  @Type(() => TDateTimeUTC)
  dhEmi: TDateTimeUTC

  @IsNotEmpty({
    message: 'O elemento tpNF é obrigatório'
  })
  @IsIn(["0", "1"], {
    message: 'O elemento tpNF deve conter o valor de 0 = Entrada ou 1 = Saída'
  })
  tpNF: string

  @IsNotEmpty({
    message: 'O elemento IE é obrigatório'
  })
  IE: string

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => TDest)
  dest: TDest
  
}