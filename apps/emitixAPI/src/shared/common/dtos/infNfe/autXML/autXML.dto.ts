import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateIf } from 'class-validator';
import  { TCnpj } from 'src/core/nfe/domain/types/primitivies_types/TCnpj';
import  { TCpf } from 'src/core/nfe/domain/types/primitivies_types/TCpf';


export class autXMLDto {
  map(arg0: (auth: any) => import("../../../../../core/nfe/domain/values-objects/autXML.vo").AutXML): import("../../../../../core/nfe/domain/values-objects/autXML.vo").AutXML[] | undefined {
    throw new Error('Method not implemented.');
  }
  @IsNotEmpty()
  @ValidateIf((o) => !o.CPF)
  @Type(() => TCnpj)
  CNPJ: TCnpj;

  @IsNotEmpty()
  @ValidateIf((o) => !o.CNPJ)
  @Type(() => TCpf)
  CPF: TCpf;
}
