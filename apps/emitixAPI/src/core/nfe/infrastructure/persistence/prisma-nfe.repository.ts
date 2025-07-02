import { PrismaService } from "src/shared/common/prismaConfig/prisma.service";
import { PrismaMethodsInterface } from "./interfaces/prisma-methods.interface";

export class PrismaNfeRepository implements PrismaMethodsInterface {
    
    private _prisma: PrismaService

    constructor(private prisma: PrismaService) {
        this._prisma = prisma
    }
    
    async consultaProcessamento (data: any, cUF: string, status: string): Promise<any> {
        const consultaProcessamentoSave = await this._prisma.emission.create({
            data: {
                chaveAcesso: data.chaveAcesso,
                dataEmissao: data.dataEmissao,
                numeroDocumento: data.numeroDocumento,
                pdf: data.pdf,
                xml: data.xml,
                status: status,
                type: "NFE",
                uf: cUF,
                valor: data.valor,
                issuerId: data.issuerId,
            }
        })

        return consultaProcessamentoSave
    };
    async inutilizarNFe (data: any, certificate: string, password: string, indSinc: number, cUF: string): Promise<any> {

    };
    async consultaSitNFe (data: any, certificate: string, password: string, indSinc: number, cUF: string): Promise<any> {

    };
    async evento (data: any, certificate: string, password: string, indSinc: number, cUF: string): Promise<any> {

    };
    async logSuccess (data: any, certificate: string, password: string, indSinc: number, cUF: string): Promise<any> {

    };
    async logError (data: any, certificate: string, password: string, indSinc: number, cUF: string): Promise<any> {

    };
    async danfeNFe (data: any, certificate: string, password: string, indSinc: number, cUF: string): Promise<any> {

    };
    async consultaCadastro (data: any, certificate: string, password: string, indSinc: number, cUF: string): Promise<any> {

    };
    async statusNFe (data: any, certificate: string, password: string, indSinc: number, cUF: string): Promise<any> {

    };
    async create(data: any, certificate: string, password: string, indSinc: number, issuerInvoice: string, cUF: string): Promise<any> {

    }
}