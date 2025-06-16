import { Controller } from '@nestjs/common';
import { MdfService } from '../application/mdf.service';

@Controller('mdf')
export class MdfController {
  constructor(private readonly mdfService: MdfService) {}
}
