import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { TDec_1302 } from 'src/core/nfe/domain/types/primitivies_types/TDec_1302';

export class ICMSTotDto {
  @IsNotEmpty({
    message: 'TOtais referentes ao ICMS',
  })
  @Type(() => TDec_1302)
  vBC: TDec_1302;

  @IsNotEmpty({
    message: 'Valor Total do ICMS',
  })
  @Type(() => TDec_1302)
  vICMS: TDec_1302;

  @IsNotEmpty({
    message: 'Valor TOtal do ICMS desonerado',
  })
  @Type(() => TDec_1302)
  vICMSDeson: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  vFCPUFDest: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSUFDest: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSUFRemet: TDec_1302;

  @IsNotEmpty({
    message: 'Valor Total do FCP (Fundo de Combate à Pobreza)',
  })
  @Type(() => TDec_1302)
  vFCP: TDec_1302;

  @IsNotEmpty({
    message: 'BC do ICMS ST',
  })
  @Type(() => TDec_1302)
  vBCST: TDec_1302;

  @IsNotEmpty({
    message: 'Valor Total do ICMS ST',
  })
  @Type(() => TDec_1302)
  vST: TDec_1302;

  @IsNotEmpty({
    message:
      'Valor Total do FCP (FUndo de Combate à Pobreza) retido por substituição tributária.',
  })
  @Type(() => TDec_1302)
  vFCPST: TDec_1302;

  @IsNotEmpty({
    message:
      'Valor Total do FCP (Fundo de Combate à Pobreza) retido anteriormente por substituição tributária.',
  })
  @Type(() => TDec_1302)
  vFCPSTRet: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  qBCMono: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSMono: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  qBCMonoReten: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSMonoReten: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  qBCMonoRet: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  vICMSMonoRet: TDec_1302;

  @IsNotEmpty({
    message: 'Valor Total dos produtos e serviços',
  })
  @Type(() => TDec_1302)
  vProd: TDec_1302;

  @IsNotEmpty({
    message: 'Valor Total do Frete',
  })
  @Type(() => TDec_1302)
  vFrete: TDec_1302;

  @IsNotEmpty({
    message: 'Valor Total do Seguro',
  })
  @Type(() => TDec_1302)
  vSeg: TDec_1302;

  @IsNotEmpty({
    message: 'Valor Total do Desconto',
  })
  @Type(() => TDec_1302)
  vDesc: TDec_1302;

  @IsNotEmpty({
    message: 'Valor Total do II',
  })
  @Type(() => TDec_1302)
  vII: TDec_1302;

  @IsNotEmpty({
    message: 'Valor Total do IPI',
  })
  @Type(() => TDec_1302)
  vIPI: TDec_1302;

  @IsNotEmpty({
    message:
      'Valor Total do IPI devolvido. Deve ser informado quando preenchido o Grupo Tributados Devolvidos na emissão de nota finNfe=4 (devolução) nas operações com não contribuintes do IPI. Corresponde ao total da soma dos campos id: UA04',
  })
  @Type(() => TDec_1302)
  vIPIDevol: TDec_1302;

  @IsNotEmpty({
    message: 'Valor do PIS',
  })
  @Type(() => TDec_1302)
  vPIS: TDec_1302;

  @IsNotEmpty({
    message: 'Valor do COFINS',
  })
  @Type(() => TDec_1302)
  vCOFINS: TDec_1302;

  @IsNotEmpty({
    message: 'Outras Despesas acessórias',
  })
  @Type(() => TDec_1302)
  vOutro: TDec_1302;

  @IsNotEmpty({
    message: 'Valor Total da NF-e',
  })
  @Type(() => TDec_1302)
  vNF: TDec_1302;

  @IsOptional()
  @Type(() => TDec_1302)
  vTotTrib: TDec_1302;
}
