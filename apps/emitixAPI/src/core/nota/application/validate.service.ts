import type { Base64 } from "node-forge";
import { validateCertificate } from "src/shared/common/utils/validate/validateCertificate.util";

export class ValidateCertificate {
  async execute(cert: Base64) {
    const validate = validateCertificate(cert)
    return validate
  }
}