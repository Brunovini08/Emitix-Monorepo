import { create } from "xmlbuilder2";
import { ExpandObject, XMLBuilderCreateOptions } from "xmlbuilder2/lib/interfaces";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NFeEnvioBuilder {

  async buildXML(
    data: XMLBuilderCreateOptions | string | ExpandObject,
    cNF: string,
    cDV: string,
    chave: string,
  ) {
    const root = create(data)
    const NFe = root.find((node) => node.node.nodeName === 'NFe');
    NFe?.att('xmlns', 'http://www.portalfiscal.inf.br/nfe');

    const infNfe = NFe?.find((node) => node.node.nodeName === 'infNFe');
    infNfe?.att('Id', `NFe${chave}`);
    infNfe?.att('versao', '4.00');

    const ide = infNfe?.find((node) => node.node.nodeName === 'ide');
    if (ide) {
      const cNFTag = ide.ele('cNF').txt(cNF);
      const tag = Array.from(ide.node.childNodes).filter(
        (n) => n?.nodeType === 1,
      );
      if (tag.length >= 1) {
        ide.node.insertBefore(cNFTag.node, tag[1] ?? null);
      } else {
        ide.node.appendChild(cNFTag.node);
      }
    }

    const detElements = infNfe?.find((node) => node.node.nodeName === 'det')
      ? infNfe.find((node) => node.node.nodeName === 'det')
      : [];

    if (Array.isArray(detElements)) {
      detElements.forEach((detNode, index) => {
        (detNode as any).att('nItem', (index + 1).toString());
      });
    } else {
      detElements?.att('nItem', '1');
    }

    const tpEmisTag = ide?.find((node) => node.node.nodeName === 'tpEmis');
    const cDVTag = ide?.ele('cDV').txt(cDV ? cDV : '0');
    if (tpEmisTag) {
      const siblings = Array.from(ide?.node.childNodes ?? []).filter(
        (n) => n?.nodeType === 1,
      );
      const tpEmisIndex = siblings.findIndex((n) => n?.nodeName === 'tpEmis');
      if (tpEmisIndex !== -1) {
        const nextNode = siblings[tpEmisIndex + 1] ?? null;
        if (cDVTag?.node && nextNode) {
          ide?.node.insertBefore(cDVTag.node, nextNode);
        } else if (cDVTag?.node) {
          ide?.node.appendChild(cDVTag.node);
        }
      } else {
        if (cDVTag?.node) {
          ide?.node.appendChild(cDVTag.node);
        }
      }
    } else {
        if (cDVTag?.node) {
          ide?.node.appendChild(cDVTag.node);
        }
    }

    const xml = root.end({ prettyPrint: false, headless: true });
    return {
      xml: xml,
      chave_acesso: chave,
    };
  }
}