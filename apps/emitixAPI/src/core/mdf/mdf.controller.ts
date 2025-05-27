import { Controller } from '@nestjs/common';
import { MdfService } from './mdf.service';

@Controller('mdf')
export class MdfController {
  constructor(private readonly mdfService: MdfService) {}
}
