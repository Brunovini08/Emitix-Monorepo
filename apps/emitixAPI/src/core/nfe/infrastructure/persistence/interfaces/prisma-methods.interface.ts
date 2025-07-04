export interface PrismaMethodsInterface {
  create(data: any, status: string, password: string, indSinc: number, issuerInvoiceId: string, cUF: string): Promise<any>;
  consultaProcessamento (data: any, status: string, password: string, indSinc: number, issuerInvoiceId: string, cUF: string): Promise<any>;
  inutilizarNFe (data: any, status: string, password: string, indSinc: number, issuerInvoiceId: string, cUF: string): Promise<any>;
  consultaSitNFe (data: any, status: string, password: string, indSinc: number, issuerInvoiceId: string, cUF: string): Promise<any>;
  evento (data: any, status: string, password: string, indSinc: number, issuerInvoiceId: string, cUF: string): Promise<any>;
  logSuccess (data: any, status: string, password: string, indSinc: number, issuerInvoiceId: string, cUF: string): Promise<any>;
  logError (data: any, status: string, password: string, indSinc: number, issuerInvoiceId: string, cUF: string): Promise<any>;
  danfeNFe (data: any, status: string, password: string, indSinc: number, issuerInvoiceId: string, cUF: string): Promise<any>;
  consultaCadastro (data: any, status: string, password: string, indSinc: number, issuerInvoiceId: string, cUF: string): Promise<any>;
  statusNFe (data: any, status: string, password: string, indSinc: number, issuerInvoiceId: string, cUF: string): Promise<any>;
}