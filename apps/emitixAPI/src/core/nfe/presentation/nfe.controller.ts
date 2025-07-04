import {
  Controller,
  Post,
  Body,
  Res,
  Headers,
  Request,
  BadRequestException,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { NfeService } from '../application/services/nfe.service';
import type { Base64 } from 'node-forge';
import { Response } from 'express';
import { AuthGuard } from 'src/core/auth/presentation/jwt-auth.guard';
import { IssuerService } from 'src/core/issuer/application/issuer.service';
import  TEnvConsSitNfe from '../domain/types/complex_types/TCons/TEnvConsSitNfe';
import  TEnvConsStatServ from '../domain/types/complex_types/TCons/TEnvConsStatServ';
import  { TEnviConsReciNFe } from '../domain/types/complex_types/TCons/TEnviConsReciNFe';
import  { TEnvDistDFeInt } from '../domain/types/complex_types/TDist/TEnvDistDFeInt';
import  { TEnvEvento } from '../domain/types/complex_types/TEvento/TEnvEvento';
import  TEnvInutNfe from '../domain/types/complex_types/TInut/TEnvInutNfe';
import  { NFeDto } from '../domain/types/complex_types/TNFe/NFe.dto';
import { TEnvConsCad } from '../domain/types/complex_types/TCons/TEnvConsCad';
import { AppErrorFilter } from './filters/app.error-filter';
import { Logger } from 'nestjs-pino';

@Controller('nfe')
@UseFilters(new AppErrorFilter())
export class NfeController {
  constructor(
    private nfeService: NfeService, 
    private issuerInvoiceService: IssuerService,
    private readonly logger: Logger
  ) { }

  @UseGuards(AuthGuard)
  @Post('emitir')
  async create(
    @Body() nfe: NFeDto,
    @Res() res: Response,
    @Request() req,
    @Headers('password') password: string,
    @Headers('certificate') certificate: Base64,
    @Headers('indSinc') indSinc: string,
  ) {
    const issuerInvoice = await this.issuerInvoiceService.create({
      cnpj: String(nfe?.NFe?.infNFe?.emit?.CNPJ),
      razaoSocial: String(nfe?.NFe?.infNFe?.emit?.xNome),
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
      const xml = await this.nfeService.create(
        nfe,
        certificate,
        password,
        userId,
        indSinc,
        5,
        issuerInvoice,
        "55"
      );
      this.logger.log(xml)
      res.send(xml)
    } catch (error) {
      this.logger.error(error)
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
      const xml = await this.nfeService.consultaProcessamento(
        body,
        certificate,
        password,
        6,
        "55"
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
      const xml = await this.nfeService.inutilizarNFe(
        body,
        certificate,
        password,
        0,
        "55"
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
      const xml = await this.nfeService.consultaNFe(body, certificate, password, 1, "55")
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
      const xml = await this.nfeService.statusServico(body, certificate, password, 2, "55")
      res.send(xml)
    } catch (error) {
      console.error(error)
      throw new BadRequestException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Post('consultacadastro')
  async consultaCadastro(
    @Body() body: TEnvConsCad,
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
      const xml = await this.nfeService.consultaCadastro(body, certificate, password, 3, "55")
      res.send(xml)
    } catch (error) {
      console.error(error)
      throw new BadRequestException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Post('distribuicaodfe')
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
      const xml = await this.nfeService.distribuicaoDfe(body, certificate, password, 7, "55") 
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
      const xml = await this.nfeService.evento(body, certificate, password, 4, userId, "55")
      res.send(xml)
    } catch (error) {
      console.error(error)
      throw new BadRequestException(error)
    } 
  }

}
