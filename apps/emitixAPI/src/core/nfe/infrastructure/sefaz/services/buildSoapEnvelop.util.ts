
export class BuildSoapEnvelop {
  static buildSoapEnvelope(xml: string, urlName: string): string {
    const danfe = `<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                     xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                     xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">  
      <soap12:Body> 
       <nfeDistDFeInteresse xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe">
        <nfeDadosMsg xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/${urlName}">
          ${xml}
        </nfeDadosMsg> 
      </nfeDistDFeInteresse>
      </soap12:Body> 
    </soap12:Envelope>`
  
    const normal_req = `<?xml version="1.0" encoding="utf-8"?>
      <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                       xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                       xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">  
        <soap12:Body> 
          <nfeDadosMsg xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/${urlName}">
            ${xml}
          </nfeDadosMsg> 
        </soap12:Body> 
      </soap12:Envelope>`
  
    return urlName === 'NFeDistribuicaoDFe' ? danfe : normal_req
  }
}

