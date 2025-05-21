import { PartialType } from '@nestjs/mapped-types';
import { TNFeDto } from '../reusable/types/complex_types/TNFe/TNFe';

export class UpdateNfeDto extends PartialType(TNFeDto) {}
