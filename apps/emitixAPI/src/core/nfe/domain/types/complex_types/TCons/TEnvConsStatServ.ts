import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from "class-validator";
import TConsStatServ from "./TConsStatServ";

export default class TEnvConsStatServ {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => TConsStatServ)
  consStatServ: TConsStatServ

  @IsNotEmpty({
    message: "CNPJ é obrigatório"
  })
  CNPJ: string
}