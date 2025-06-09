import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class TProcEmi {
  @IsNotEmpty({
    message: 'Tipo proceso de emissão do CT-e'
  })
  @IsString()
  @IsIn(['0', '3'], {
    message: 
    `
      Preencher com:
      0 - Emissão de CT-e com aplicativo do contribuinte;
      3 - Emissão CT-e pelo contribuinte com aplicativo fornecido pelo SEBRAE
    `
  })
  tprocemi: string
}