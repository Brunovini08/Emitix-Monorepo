import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from "class-validator";
import TConsSitNfe from "./TConsSitNfe";

export default class TEnvConsSitNfe {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => TConsSitNfe)
  consSitNFe: TConsSitNfe

  @IsNotEmpty({
    message: "O CNPJ é obrigatório"
  })
  CNPJ: string
}