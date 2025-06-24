import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ICMS00Dto } from './ICMS00/ICMS00.dto';
import { ICMS02Dto } from './ICMS02/ICMS02.dto';
import { ICMS10Dto } from './ICMS10/ICMS10.dto';
import { ICMSSN101Dto } from './ICMSSN101/ICMSSN101.dto';
import { ICMS15Dto } from './ICMS15/ICMS15.dto';
import { ICMS20Dto } from './ICMS20/ICMS20.dto';
import { ICMSSN201Dto } from './ICMSSN201/ICMSSN201.dto';
import { ICMSSN202Dto } from './ICMSSN202/ICMS202.dto';
import { ICMS30Dto } from './ICMS30/ICMS30.dto';
import { ICMS40Dto } from './ICMS40/ICMS40.dto';
import { ICMS51Dto } from './ICMS51/ICMS51.dto';
import { ICMS53Dto } from './ICMS53/ICMS53.dto';
import { ICMS60Dto } from './ICMS60/ICMS60.dto';
import { ICMS61Dto } from './ICMS61/ICMS61.dto';
import { ICMS70Dto } from './ICMS70/ICMS70.dto';
import { ICMS90DTo } from './ICMS90/ICMS90.dto';
import { ICMSSN900Dto } from './ICMSSN900/ICMSSN900.dto';
import { ICMSPARTDto } from './ICMSPART/ICMSTPART.dto';
import { ICMSSN102Dto } from './ICMSSN102/ICMSSN102.dto';
import { ICMSSN500Dto } from './ICMSSN500/ICMSSN500.dto';
import { ICMSSTDto } from './ICMSST/ICMSST.dto';

export class ICMSDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => ICMS00Dto)
  ICMS00: ICMS00Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMS02Dto)
  ICMS02: ICMS02Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMS10Dto)
  ICMS10: ICMS10Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMSSN101Dto)
  ICMS101: ICMSSN101Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMS15Dto)
  ICMS15: ICMS15Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMS20Dto)
  ICMS20: ICMS20Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMSSN201Dto)
  ICMSSN201: ICMSSN201Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMSSN202Dto)
  ICMSSN202: ICMSSN202Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMS30Dto)
  ICMS30: ICMS30Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMS40Dto)
  ICMS40: ICMS40Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMS51Dto)
  ICMS51: ICMS51Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMS53Dto)
  ICMS53: ICMS53Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMS60Dto)
  ICMS60: ICMS60Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMS61Dto)
  ICMS61: ICMS61Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMS70Dto)
  ICMS70: ICMS70Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMS90DTo)
  ICMS90: ICMS90DTo;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMSSN900Dto)
  ICMSSN900: ICMSSN900Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMSPARTDto)
  ICMSPART: ICMSPARTDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMSSN102Dto)
  ICMSSN102: ICMSSN102Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMSSN101Dto)
  ICMSSN101: ICMSSN101Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMSSN500Dto)
  ICMSSN500: ICMSSN500Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ICMSSTDto)
  ICMSST: ICMSSTDto;
}

export type TCMSDto =
  | ICMS00Dto
  | ICMS02Dto
  | ICMS10Dto
  | ICMS15Dto
  | ICMS20Dto
  | ICMS30Dto
  | ICMS60Dto
  | ICMS40Dto
  | ICMS51Dto
  | ICMS53Dto
  | ICMS70Dto
  | ICMSSN101Dto
  | ICMS61Dto
  | ICMSSN201Dto
  | ICMSSN202Dto
  | ICMS90DTo
  | ICMSSN102Dto
  | ICMSSN900Dto
  | ICMSSN500Dto
  | ICMSPARTDto
  | ICMSSTDto;
