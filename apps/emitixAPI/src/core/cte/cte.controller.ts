import { Controller } from '@nestjs/common';
import { CteService } from './cte.service';

@Controller('cte')
export class CteController {
  constructor(private readonly cteService: CteService) {}
}
