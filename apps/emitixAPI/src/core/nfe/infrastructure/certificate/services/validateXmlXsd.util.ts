import * as fs from 'fs';
import * as path from 'path';
import { validateXML } from 'xsd-schema-validator';

// Caminho real do seu XSD
const XSD_PATH = [
  'xsds/nfe_v4.00.xsd', 
  'xsds/consReciNFe_v4.00.xsd', 
  "xsds/inutNFe_v4.00.xsd", 
  "xsds/consSitNFe_v4.00.xsd", 
  "xsds/consStatServ_v4.00.xsd", 
  "xsds/consCad_v2.00.xsd", 
  "xsds/distDFeInt_v1.01.xsd",
  "xsds/envEventoCancNFe_v1.00.xsd",
];

export class ValidateXmlXsdUtil {
  constructor(
    private readonly xmlString: string,
    private readonly pathInfo: number,
  ) {
    this.xmlString = xmlString
    this.pathInfo = pathInfo
  }

  async validateXmlXsd(): Promise<boolean | string[]> {
   try{ 
    if (!this.xmlString) return ['XML vazio ou inválido'];
    const result = await validateXML({ file: this.xmlString }, XSD_PATH[this.pathInfo]);
    if (result.valid) return true;
    return result.messages;
   } catch (err) {
    console.error('Erro ao validar XML:', err);
    return [`Erro de validação: ${err.message}`];
   }
  }

}

export const validateXmlXsd = async (xmlString: string, pathInfo: number) => {
  if (!xmlString) {
    return ['XML vazio ou inválido'];
  }

  // Criar caminho temporário do XML
  const tempFilePath = path.resolve(__dirname, 'temp-nfe.xml');

  try {
    // Salvar XML no disco
    fs.writeFileSync(tempFilePath, xmlString, { encoding: 'utf-8' });
    const result = await validateXML({ file: tempFilePath }, XSD_PATH[pathInfo]);

    // Retornar se é válido ou mensagens de erro
    if (result.valid) return true;
    return result.messages;
  } catch (err) {
    console.error('Erro ao validar XML:', err);
    return [`Erro de validação: ${err.message}`];
  } finally {
    try {
      if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
    } catch (cleanupErr) {
      console.error('Erro ao limpar arquivo temporário:', cleanupErr);
    }
  }
};
