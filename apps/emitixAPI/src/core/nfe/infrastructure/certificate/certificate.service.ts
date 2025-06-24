import type { Base64 } from "node-forge";
import { loadCertificate } from "./services/processCertificate.util";
import { BadRequestException } from "@nestjs/common";
import { extractCNPJFromSubject } from "./services/getCnpjFromCertificate.util";

export class CertificateService {

  public async validateCertificate(file: Base64, certPassword: string) {
    const { cert, privateKey } = await loadCertificate(file, certPassword)
    if (!cert || !privateKey) throw new BadRequestException('Certificado inválido')
    return { cert, privateKey }
  }

  public async extractCnpjFromCertificate(file: Base64, certPassword: string) {
    const cert = await this.validateCertificate(file, certPassword)
    const cnpj = extractCNPJFromSubject(file, certPassword)
    return cnpj
  }

  public async validateCnpjFromCertificate(file: Base64, certPassword: string, cnpjEmit: string) {
    const cnpj = await this.extractCnpjFromCertificate(file, certPassword)
    if (String(cnpjEmit) !== cnpj)
      throw new BadRequestException('Cnpj do emitente não é igual ao do certificado')
  }
}