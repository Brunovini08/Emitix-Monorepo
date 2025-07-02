import * as forge from 'node-forge';
export function loadCertificate(decode: forge.Base64, password: string) {
  const pfxBuffer = forge.util.decode64(decode);
  const p12Asn1 = forge.asn1.fromDer(pfxBuffer);
  const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, password);
  const keyBags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
  const privateKeyBag = keyBags[forge.pki.oids.pkcs8ShroudedKeyBag];
  const privateKey = privateKeyBag?.[0]?.key ?? null;

  // Passo 5: Extrai o certificado
  const certBags = p12.getBags({ bagType: forge.pki.oids.certBag });
  const cert = (certBags[forge.pki.oids.certBag] ?? [])[0]
    ? (certBags[forge.pki.oids.certBag] ?? [])[0]?.cert
    : null;
  console.log('Certificado extraído:', cert?.validity.notBefore, cert?.validity.notAfter);
  // Passo 6: Extrai o CNPJ do campo 'serialNumber' do subject
  let cnpj;
  cert?.subject.attributes.forEach((attr) => {
    if (attr.name === 'serialNumber' || attr.type === '2.16.76.1.3.3') {
      cnpj = attr.value;
    }
  });


  return {
    privateKey,
    cert,
  };
}
