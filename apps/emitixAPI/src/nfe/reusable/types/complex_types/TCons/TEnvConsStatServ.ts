import { Type } from "class-transformer";
import { IsNotEmptyObject, ValidateNested } from "class-validator";
import TConsStatServ from "./TConsStatServ";

export default class TEnvConsStatServ {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => TConsStatServ)
  consStatServ: TConsStatServ
}