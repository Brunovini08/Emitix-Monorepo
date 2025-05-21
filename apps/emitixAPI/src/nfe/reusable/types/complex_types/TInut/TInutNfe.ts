import { Type } from "class-transformer";
import { IsIn, IsNotEmpty, Length } from "class-validator";
import { TAmb } from "../../primitivies_types/TAmb";
import { TUf } from "../../primitivies_types/TUf";
import { TCnpj } from "../../primitivies_types/TCnpj";
import { TMod } from "../../primitivies_types/TMod";
import { TSerie } from "../../primitivies_types/TSerie";
import { TString } from "../../primitivies_types/TString";

export default class TInutNFe {
  @IsNotEmpty({
    message: 'O elemento tpAmb não pode ser vazio'
  })
  @IsIn(['1', '2'], {
    message: 'O elemento tpAmb deve ser 1 - Produção ou 2 - Homologação'
  })
  @Type(() => TAmb)
  tpAmb: TAmb;

  @IsNotEmpty({
    message: 'O elemento xServ não pode ser vazio'
  })
  xServ: string;

  @IsNotEmpty({
    message: 'O elemento cUF não pode ser vazio'
  })
  @Type(() => TUf)
  cUF: TUf;

  @IsNotEmpty({
    message: 'O elemento ano não pode ser vazio'
  })
  @Length(2, 2, {
    message: 'O elemento ano deve ter 2 caracteres'
  })
  ano: string;

  @IsNotEmpty({
    message: 'O elemento CNPJ não pode ser vazio'
  })
  @Type(() => TCnpj)
  CNPJ: TCnpj;

  @IsNotEmpty({
    message: 'O elemento mod não pode ser vazio'
  })
  @Type(() => TMod)
  mod: TMod;

  @IsNotEmpty({
    message: 'O elemento serie não pode ser vazio'
  })
  @Type(() => TSerie)
  serie: TSerie;

  @IsNotEmpty({
    message: 'O elemento nNFIni não pode ser vazio'
  })
  @Type(() => TString)
  @Length(1, 9, {
    message: 'O elemento nNFIni deve ter entre 1 e 9 caracteres'
  })
  nNFIni: TString;

  @IsNotEmpty({
    message: 'O elemento nNFFin não pode ser vazio'
  })
  @Type(() => TString)
  @Length(1, 9, {
    message: 'O elemento nNFFin deve ter entre 1 e 9 caracteres'
  })
  nNFFin: TString;
  @IsNotEmpty({
    message: 'O elemento xJust não pode ser vazio'
  })
  @Length(15, 255, {
    message: 'O elemento xJust deve ter entre 15 e 255 caracteres'
  })
  xJust: TString;

  @IsNotEmpty({
    message: 'O atributo versao não pode ser vazio'
  })
  versao: string;
}