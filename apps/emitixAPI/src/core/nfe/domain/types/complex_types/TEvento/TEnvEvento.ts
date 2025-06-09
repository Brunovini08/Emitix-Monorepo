import { Type } from "class-transformer";
import { IsNotEmptyObject, ValidateNested } from "class-validator";
import { TEnvInfoEvento } from "./TEnvInfoEvento";

export class TEnvEvento {
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => TEnvInfoEvento) 
    envEvento!: TEnvInfoEvento;
}