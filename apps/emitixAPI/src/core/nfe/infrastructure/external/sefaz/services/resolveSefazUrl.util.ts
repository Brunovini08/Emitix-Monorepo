
import { SEFAZ_CONFIG } from "src/shared/config/sefaz.config";

export class ResolveSefazUrl {
  static async resolveSefazUrl(uf: string, tpAmb: string, service: number, typeDocument: string): Promise<{ url: string, urlName: string }> {
    try {
      const urls = SEFAZ_CONFIG[uf][typeDocument][tpAmb];
      const url = Object.values(urls)[service];
      const urlName = Object.keys(urls)[service];

      if (!url) {
        throw new Error(`URL not found for UF=${uf}, Ambiente=${tpAmb}, Serviço=${service}`);
      }
      return { url: url as string, urlName };
    } catch (error) {
      console.error('Erro ao resolver URL da SEFAZ:', error);
      throw error;
    }
  }
}