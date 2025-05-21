import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { TChNFe } from "../../primitivies_types/TChNFe";

export class TConsChNFe {
  @IsNotEmpty({
    message: 'O elemento chNFe não pode estar vazio'
  })
  @Type(() => TChNFe)
  chNFe: TChNFe
}