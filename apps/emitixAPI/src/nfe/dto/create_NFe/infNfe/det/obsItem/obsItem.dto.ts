import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { obsContentDto } from './obsContent.dto';
import { obsFiscoDto } from './obsFisco.dto';

export class obsItemDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => obsContentDto)
  obsCont: obsContentDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => obsFiscoDto)
  obsFisco: obsFiscoDto;
}
