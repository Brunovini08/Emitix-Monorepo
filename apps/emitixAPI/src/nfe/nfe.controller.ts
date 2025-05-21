/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import { NfeService } from './services/nfe.service';
import { NFeDto } from './reusable/types/complex_types/TNFe/NFe.dto';
import type { Base64 } from 'node-forge';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { IssuerService } from 'src/issuer/issuer.service';
import { TEnviConsReciNFe } from './reusable/types/complex_types/TCons/TEnviConsReciNFe';
import TEnvInutNfe from './reusable/types/complex_types/TInut/TEnvInutNfe';
import TEnvConsSitNfe from './reusable/types/complex_types/TCons/TEnvConsSitNfe';
import TEnvConsStatServ from './reusable/types/complex_types/TCons/TEnvConsStatServ';
import { TEnvDistDFeInt } from './reusable/types/complex_types/TDist/TEnvDistDFeInt';
import { TEnvEvento } from './reusable/types/complex_types/TEvento/TEnvEvento';

@Controller('nfe')
export class NfeController {
  constructor(private nfeService: NfeService, private issuerInvoiceService: IssuerService) { }

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
    @Body() body,
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
      const xml = await this.nfeService.distribuicaoDfe(body, certificate, password, 0, "55") 
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
