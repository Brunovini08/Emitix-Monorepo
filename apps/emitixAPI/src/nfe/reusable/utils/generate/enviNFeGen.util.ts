import { create } from 'xmlbuilder2';

export async function enviNFeGen(
  idLote: string,
  indSinc: string,
  nfeXml: string,
): Promise<string> {
  const doc = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('enviNFe', {
      xmlns: 'http://www.portalfiscal.inf.br/nfe',
      versao: '4.00',
    })
    .ele('idLote')
    .txt(idLote)
    .up()
    .ele('indSinc')
    .txt(indSinc)
    .up()
    // Aqui você injeta o XML assinado da NFe como nó
    .import(create(nfeXml).root())
    .doc();

  return doc.end({ prettyPrint: false, headless: true });
}
