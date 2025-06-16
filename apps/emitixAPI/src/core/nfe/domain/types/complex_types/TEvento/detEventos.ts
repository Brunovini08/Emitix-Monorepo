import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { TAtorInteressado } from "./TAtorInteressado/TAtorInteressado";
import { TCancelamento } from "./TCancelamento/TCancelamento";
import { TCarta_Correcao } from "./TCarta_Correcao/TCarta_Correcao";
import { TEpec } from "./TEpec/TEpec";
import { TMani_Dest } from "./TMani_dest/TMani_Dest";
import { TPedido_Prorrog } from "./TPedido_Prorrog/TPedido_Prorrog";

export class DetEventos {
  @IsOptional()
  @ValidateNested()
  @Type(() => TAtorInteressado)
  TAtorInteressado: TAtorInteressado

  @IsOptional()
  @ValidateNested()
  @Type(() => TCancelamento)
  TCancelamento: TCancelamento

  @IsOptional()
  @ValidateNested()
  @Type(() => TCarta_Correcao)
  TCarta_Correcao: TCarta_Correcao

  @IsOptional()
  @ValidateNested()
  @Type(() => TEpec)
  TEpec: TEpec

  @IsOptional()
  @ValidateNested()
  @Type(() => TMani_Dest)
  TMani_Dest: TMani_Dest

  @IsOptional()
  @ValidateNested()
  @Type(() => TPedido_Prorrog)
  TPedido_Prorrog: TPedido_Prorrog
}