export function cleanXmlBeforeValidation(xml: string): string {
  // Remove espaços em branco ou quebras de linha extras antes do XML
  return xml.replace(/^\s+/, '').replace(/\s+$/, '');
}
