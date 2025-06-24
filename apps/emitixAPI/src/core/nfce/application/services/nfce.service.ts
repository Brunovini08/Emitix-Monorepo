// import { BadRequestException, Injectable } from '@nestjs/common';
// import { loadCertificate } from 'src/core/nfe/infrastructure/certificate/services/processCertificate.util';
// import { Base64 } from 'node-forge';
// import { NotaService } from 'src/core/nfe/application/services/nota.service';
// import TEnvConsSitNfe from 'src/core/nfe/domain/types/complex_types/TCons/TEnvConsSitNfe';
// import TEnvConsStatServ from 'src/core/nfe/domain/types/complex_types/TCons/TEnvConsStatServ';
// import { TEnviConsReciNFe } from 'src/core/nfe/domain/types/complex_types/TCons/TEnviConsReciNFe';
// import { TEnvDistDFeInt } from 'src/core/nfe/domain/types/complex_types/TDist/TEnvDistDFeInt';
// import { TEnvEvento } from 'src/core/nfe/domain/types/complex_types/TEvento/TEnvEvento';
// import TEnvInutNfe from 'src/core/nfe/domain/types/complex_types/TInut/TEnvInutNfe';
// import { NFeDto } from 'src/core/nfe/domain/types/complex_types/TNFe/NFe.dto';


// @Injectable()
// export class NfceService {

//   constructor(
//     private notaService: NotaService
//   ) { }

//   async create(
//     createNfceDto: NFeDto,
//     file: Base64,
//     certPassword: string,
//     userId: string,
//     indSinc: string,
//     nUrl: number,
//     issuerInvoice: any,
//     typeDocument: string
//   ) {
//     try {
//       const { cert, privateKey } = loadCertificate(file, certPassword);
//       if (!cert || !privateKey)
//         throw new BadRequestException('Certificado inválido');
//       else {
//         return this.notaService.emitir(
//           createNfceDto,
//           file,
//           certPassword,
//           userId,
//           indSinc,
//           nUrl,
//           issuerInvoice,
//           typeDocument,
//           cert,
//           privateKey
//         );
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async consultaProcessamento(body: TEnviConsReciNFe, file: Base64,
//     certPassword: string, nUrl: number, typeDocument: string) {
//     const { cert, privateKey } = loadCertificate(file, certPassword);
//     if (!cert || !privateKey)
//       throw new BadRequestException('Certificado inválido');
//     else {
//       return this.notaService.consultaProcessamento(
//         cert,
//         privateKey,
//         body,
//         nUrl,
//         typeDocument
//       )
//     }
//   }

//   async inutilizarNFe(body: TEnvInutNfe, file: Base64, certPassword: string, nUrl: number, typeDocument: string) {
//     const { cert, privateKey } = loadCertificate(file, certPassword)
//     if (!cert || !privateKey) throw new BadRequestException('Certificado inválido')
//     else {
//       return this.notaService.inutilizarNFe(
//         body, file, certPassword, nUrl, typeDocument, cert, privateKey
//       )
//     }
//   }

//   async consultaNFe(body: TEnvConsSitNfe, file: Base64, certPassword: string, nUrl: number, typeDocument: string) {
//     const { cert, privateKey } = loadCertificate(file, certPassword)
//     if (!cert || !privateKey) throw new BadRequestException('Certificado inválido')
//     else {
//       return this.notaService.consultaNFe(
//         body,
//         cert,
//         privateKey,
//         nUrl,
//         typeDocument
//       )
//     }
//   }

//   async statusServico(body: TEnvConsStatServ, certificate: string, password: string, nUrl: number, typeDocument: string) {
//     const { cert, privateKey } = loadCertificate(certificate, password)
//     if (!cert || !privateKey) throw new BadRequestException('Certificado inválido')
//     else {
//       return this.notaService.statusServico(
//         body,
//         cert,
//         privateKey,
//         nUrl,
//         typeDocument)
//     }
//   }

//   async distribuicaoDfe(body: TEnvDistDFeInt, file: Base64, certPassword: string, nUrl: number, typeDocument: string) {
//     const { cert, privateKey } = loadCertificate(file, certPassword)
//     if (!cert || !privateKey) throw new BadRequestException('Certificado inválido')
//     else {
//       return this.notaService.distribuicaoDfe(
//         cert,
//         privateKey,
//         body,
//         nUrl,
//         typeDocument
//       )
//     }
//   }

//   async evento(body: TEnvEvento, file: Base64, certPassword: string, nUrl: number, idUser: string, typeDocument: string) {
//     const { cert, privateKey } = loadCertificate(file, certPassword)
//     if (!cert || !privateKey) throw new BadRequestException('Certificado inválido')
//     else {
//       return this.notaService.evento(
//         cert,
//         privateKey,
//         body,
//         idUser,
//         file,
//         certPassword,
//         nUrl,
//         typeDocument
//       )
//     }
//   }
// }