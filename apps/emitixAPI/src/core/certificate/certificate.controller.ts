import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
@Controller('certificate')
export class CertificateController {
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async uploadToBase64(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const upload = file.buffer.toString('base64');
    return res.json({ base64: upload });
  }
}
