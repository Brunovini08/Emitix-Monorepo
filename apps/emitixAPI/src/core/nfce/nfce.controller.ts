import {
  Controller,
  Post,
  Body,
  Res,
  Headers,
  Request,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { Base64 } from 'node-forge';
import { Response } from 'express';
import { AuthGuard } from 'src/core/auth/jwt-auth.guard';
import { IssuerService } from 'src/core/issuer/issuer.service';
import { NfceService } from './services/nfce.service';
import { NFeDto } from '../nfe/reusable/types/complex_types/TNFe/NFe.dto';
import { TEnviConsReciNFe } from '../nfe/reusable/types/complex_types/TCons/TEnviConsReciNFe';
import TEnvInutNfe from '../nfe/reusable/types/complex_types/TInut/TEnvInutNfe';
import TEnvConsSitNfe from '../nfe/reusable/types/complex_types/TCons/TEnvConsSitNfe';
import TEnvConsStatServ from '../nfe/reusable/types/complex_types/TCons/TEnvConsStatServ';
import { TEnvDistDFeInt } from '../nfe/reusable/types/complex_types/TDist/TEnvDistDFeInt';
import { TEnvEvento } from '../nfe/reusable/types/complex_types/TEvento/TEnvEvento';

@Controller('nfce')
export class NfceController {
  constructor(private nfceService: NfceService, private issuerInvoiceService: IssuerService) { }

  @UseGuards(AuthGuard)
  @Post('emitir')
  async create(
    @Body() nfce: NFeDto,
    @Res() res: Response,
    @Request() req,
    @Headers('password') password: string,
    @Headers('certificate') certificate: Base64,
    @Headers('indSinc') indSinc: string,
  ) {
    const issuerInvoice = await this.issuerInvoiceService.create({
      cnpj: String(nfce?.NFe?.infNFe?.emit?.CNPJ),
      razaoSocial: String(nfce?.NFe?.infNFe?.emit?.xNome),
      userId: req.user?.sub,
    })
    if (!issuerInvoice) {
      throw new BadRequestException('Emitente não encontrado.');
    }
    if (!certificate || !password) {
      throw new BadRequestException('Certificado e senha são obrigatórios.');
    }
    const userId = req.user?.sub;
    try {
      const xml = await this.nfceService.create(
        nfce,
        certificate,
        password,
        userId,
        indSinc,
        5,
        issuerInvoice,
        "65"
      );
      res.send(xml)
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Post('consultaProcessamento')
  async consultaProcessamento(
    @Body() body: TEnviConsReciNFe,
    @Res() res: Response,
    @Request() req,
    @Headers('password') password: string,
    @Headers('certificate') certificate: Base64,
  ) {
    if (!body) {
      throw new BadRequestException('As informações são obrigatórias.');
    }
    if (!password || !certificate) {
      throw new BadRequestException('Certificado e senha são obrigatórios.');
    }
    try {
      const xml = await this.nfceService.consultaProcessamento(
        body,
        certificate,
        password,
        6,
        "65"
      );
      res.send(xml);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Post('inutilizar')
  async inutilizar(
    @Body() body: TEnvInutNfe,
    @Res() res: Response,
    @Request() req,
    @Headers('password') password: string,
    @Headers('certificate') certificate: Base64,
  ) {
    if (!body) {
      throw new BadRequestException('As informações são obrigatórias.');
    }
    if (!password || !certificate) {
      throw new BadRequestException('Certificado e senha são obrigatórios.');
    }
    try {
      const xml = await this.nfceService.inutilizarNFe(
        body,
        certificate,
        password,
        0,
        "65"
      )
      res.send(xml);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Post('consulta')
  async consulta(
    @Body() body: TEnvConsSitNfe,
    @Res() res: Response,
    @Request() req,
    @Headers('password') password: string,
    @Headers('certificate') certificate: Base64,
  ) {
    if (!body) {
      throw new BadRequestException('As informações são obrigatórias.');
    }
    if (!password || !certificate) {
      throw new BadRequestException('Certificado e senha são obrigatórios.');
    }
    try {
      const xml = await this.nfceService.consultaNFe(body, certificate, password, 1, "65")
      res.send(xml)
    } catch (error) {
      console.error(error)
      throw new BadRequestException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Post('statusservico')
  async statusServico(
    @Body() body: TEnvConsStatServ,
    @Res() res: Response,
    @Request() req,
    @Headers('password') password: string,
    @Headers('certificate') certificate: Base64,
  ) {
    if (!body) {
      throw new BadRequestException('As informações são obrigatórias.');
    }
    if (!password || !certificate) {
      throw new BadRequestException('Certificado e senha são obrigatórios.');
    }
    try {
      const xml = await this.nfceService.statusServico(body, certificate, password, 2, "65")
      res.send(xml)
    } catch (error) {
      console.error(error)
      throw new BadRequestException(error)
    }
  }



  @UseGuards(AuthGuard)
  @Post('distribuicaodfce')
  async distribuicaoDfe(
    @Body() body: TEnvDistDFeInt,
    @Res() res: Response,
    @Request() req,
    @Headers('password') password: string,
    @Headers('certificate') certificate: Base64,
  ) {
    if (!body) {
      throw new BadRequestException('As informações são obrigatórias.');
    }
    if (!password ||!certificate) {
      throw new BadRequestException('Certificado e senha são obrigatórios.');
    }
    try {
      const xml = await this.nfceService.distribuicaoDfe(body, certificate, password, 0, "65") 
      res.send(xml)
    } catch (error) {
      console.error(error)
      throw new BadRequestException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Post('evento')
  async evento(
    @Body() body: TEnvEvento,
    @Res() res: Response,
    @Request() req,
    @Headers('password') password: string,
    @Headers('certificate') certificate: Base64,
  ){
    if (!body) {
      throw new BadRequestException('As informações são obrigatórias.');
    }
    if (!password ||!certificate) {
      throw new BadRequestException('Certificado e senha são obrigatórios.');
    }
    try {
      const userId = req.user?.sub;
      const xml = await this.nfceService.evento(body, certificate, password, 4, userId, "65")
      res.send(xml)
    } catch (error) {
      console.error(error)
      throw new BadRequestException(error)
    } 
  }

}
