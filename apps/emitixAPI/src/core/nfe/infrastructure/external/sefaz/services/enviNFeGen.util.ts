import { XMLBuilder, XMLParser } from 'fast-xml-parser';

export class EnviNFeGen {
  async enviNFeGen(
  idLote: string,
  indSinc: string,
  nfeXml: string,
): Promise<string> {
  const parser = new XMLBuilder({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
  });

  // Parsear o XML existente da NFe
  const xmlParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
  });
  
  const parsedNFe = xmlParser.parse(nfeXml);

  const xmlData = {
    enviNFe: {
      '@_xmlns': 'http://www.portalfiscal.inf.br/nfe',
      '@_versao': '4.00',
      idLote: idLote,
      indSinc: indSinc,
      NFe: parsedNFe.NFe
    }
  };

  return parser.build(xmlData);
}
}
