import { PartialType } from '@nestjs/mapped-types';
import { TNFeDto } from '../../domain/types/complex_types/TNFe/TNFe';

export class UpdateNfeDto extends PartialType(TNFeDto) {}
