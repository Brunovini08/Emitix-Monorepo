import { IsNotEmpty } from "class-validator";
import { TTNSU } from "../../primitivies_types/TTNSU";
import { Type } from "class-transformer";

export class TConsNSU {

    @IsNotEmpty({
        message: 'O elemento ultNSU não pode ser vazio'
    })
    @Type(() => TTNSU)
    ultNSU: TTNSU
}