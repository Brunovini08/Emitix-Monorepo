import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, Matches, ValidateNested } from "class-validator";
import { TCOrgaoIBGE } from "../../primitivies_types/TCOrgaoIBGE";
import { TAmb } from "../../primitivies_types/TAmb";
import { TCnpjOpc } from "../../primitivies_types/TCnpjOpc";
import { TCpf } from "../../primitivies_types/TCpf";
import { TChNFe } from "../../primitivies_types/TChNFe";
import { TDateTimeUTC } from "../../primitivies_types/TDateTimeUTC";
import { DetEventos } from "./detEventos";

export class TInfEvento {
  @IsNotEmpty({
    message: 'O elemento cOrgao deve ser informado'
  })
  @Type(() => TCOrgaoIBGE)
  cOrgao: TCOrgaoIBGE

  @IsNotEmpty({
    message: 'O elemento tpAmb deve ser informado'
  })
  @Type(() => TAmb)
  tpAmb: TAmb

  @IsOptional()
  @Type(() => TCnpjOpc)
  CNPJ: TCnpjOpc

  @IsOptional()
  @Type(() => TCpf)
  CPF: TCpf

  @IsNotEmpty({
    message: 'O elemento chNFe deve ser informado'
  })
  @Type(() => TChNFe)
  chNFe: TChNFe

  @IsNotEmpty({
    message: 'O elemento dhEvento deve ser informado'
  })
  @Type(() => TDateTimeUTC)
  dhEvento: TDateTimeUTC

  @IsNotEmpty({
    message: 'O elemento tpEvento deve ser informado'
  })
  @Matches(/^[0-9]{6}$/)
  tpEvento: string

  @IsNotEmpty({
    message: 'O elemento nSeqEvento deve ser informado'
  })
  @Matches(/^[1-9][0-9]{0,1}$/)
  nSeqEvento: string

  @IsNotEmpty({
    message: 'O elemento verEvento deve ser informado'
  })
  @IsString()
  verEvento: string

  @IsNotEmpty({ message: 'O elemento detEvento deve ser informado' })
  @ValidateNested()
  @Type(() => DetEventos)
  detEvento: DetEventos
}