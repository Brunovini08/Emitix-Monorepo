import { Controller } from '@nestjs/common';
import { NfceService } from './services/nfce.service';

@Controller('nfce')
export class NfceController {
  constructor(private readonly nfceService: NfceService) {}
}
