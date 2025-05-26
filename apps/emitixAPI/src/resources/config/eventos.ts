interface IEvento {
  [key: string]: {
    nome: string;
    descricao: string;
  };
}

export const eventos: IEvento = {
  "110110": {
    nome: "Carta de Correção Eletrônica",
    descricao: "Correção das informações da NF-e, dentro dos limites previstos na Legislação"
  },
  "110111": {
    nome: "Cancelamento pelo Emitente",
    descricao: "Cancelamento da NF-e"
  },
  "110112": {
    nome: "Cancelamento por substituição",
    descricao: "Cancelamento, emprazo não superior a 168 horas, de NFC-e emitida em duplicidade e que não acobertou a operação"
  },
  "110140": {
    nome: "EPEC - Emissão em Contingência",
    descricao: "Evento Préviode Emissão em Contingência"
  },
  "111500": {
    nome: "Pedido de Prorrogação 1º prazo",
    descricao: "Solicitação de prorrogação do prazo de retorno de produtos de uma NF-e de remessa para indstrialização por encomenda com suspensão do ICMS."
  },
  "111501": {
    nome: "Pedido de Prorrogação 2º prazo",
    descricao: "Solicitação de prorrogação do prazo de retorno de produtos de uma NF-e de remessa para industrialização por encomenda com suspensão do ICMS, após o primeiro período de prorrogação."
  },
  "111502": {
    nome: "Cancelamento do Pedido de Prorrogação 1º prazo",
    descricao: "Cancelamento do evento 111500"
  },
  "111503": {
    nome: "Cancelamento do Pedido de Prorrogação 2º prazo",
    descricao: "Cancelamento do evento 111501"
  },
  "110150": {
    nome: "Ator interessado na NF-e - Transportador",
    descricao: "Permite que o Emitente informe a identificação do Transportador a qualquer momento, como uma das pessoas autorizadas a acessar o XML da NF-e"
  },
  "210200": {
    nome: "Confirmação de Operação pelo Destinatário",
    descricao: "Manifestação do destinatário confirmando que a operação descrita na NF-e ocorreu exatamente como informado nesta NF-e",
  },
  "210210": {
    nome: "Ciência da Operação pelo Desstinatário (ou Ciência da Emissão)",
    descricao: "Recebimento pelo destinatário ou pelo remetente de informações relativas à existência de NF-e em que esteja envolvido, quando ainda não existem elementos sufiecientes para apresentar uma manifestação conclusiva"
  },
  "210240": {
    nome: "Operação não Realizada",
    descricao: "Manifestação do destinatário reconhecendo sua participação na operação descrita na NF-e, mas declarando que a operação não ocorreu ou não se efetivou como informado nesta NF-e"
  },
  "400200": {
    nome: "Documento Fiscal Inidôneo",
    descricao: 'SEFAZ do emitente declara que NF-e é um "Documento FIscal Inidôneo"',
  },
  "400201": {
    nome: "Cancelamento Evento Fisco 400200",
    descricao: "Cancelamento do evento 400200",
  },
  "411500": {
    nome: "Evento Fisco Resposta ao Pedido de Prorrogação 1º prazo",
    descricao: "Resposta do Fisco ao Pedido de Prorrogação 1º Prazo",
  },
  "411501": {
    nome: "Evento Fisco Resposta ao Pedido de Prorrogação 2º prazo",
    descricao: "Resposta do Fisco ao Pedido de Prorrogação 2º Prazo",
  },
  "411502": {
    nome: "Evento Disco Ressp ao Cancelamento de PRorrogação 1º prazo",
    descricao: "Cancelamento do evento 411500"
  },
  "411503": {
    nome: "Evento Fisco Resposta ao Cancelamento de Prorrogação 2º prazo",
    descricao: "Cancelamento do evento 411501"
  },
  "610500": {
    nome: "Registro Passagem NF-e",
    descricao: "Registro de Passagem NF-e no Porto Fiscal."
  },
  "610501": {
    nome: "Cancelamento Registro Passagem NF-e",
    descricao: "Camceça,emtp dp evemtp 610500"
  },
  "400300": {
    nome: "Visto Eletrônico do Fisco",
    descricao: "Possibilita que a SEFAZ marque uma NF-e emitida em função de uma situação específica prevista em legislação"
  },
  "400301": {
    nome: "Cancelamento Evento Fisco 400300",
    descricao: "Cancelamento do evento 400300 - Visto Eletrônico do Fisco"
  },
  "400100": {
    nome: "Alerta Fisco Emitente: Simulação Operação Emitente",
    descricao: 'SEFAZ do emitente declara que NF-e é um "Documento com simulação de operação do Emitente"'
  },
  "400104": {
    nome: "Alerta Fisco Emitente: Simulação Operação Emitente Inex.",
    descricao: 'SEFAZ do emitente declara que NF-e é um "Documento com simulação de operação do Destinatário"'
  },
  "400101": {
    nome: "Cancelamento Evento Fisco 400100",
    descricao: "Cancelamento Evento Fisco 400100"
  },
  "400105": {
    nome: "Cancelamento Evento Fisco 400104",
    descricao: "Cancelamento Evento Fisco 400104"
  },
  "400121": {
    nome: "Cancelamento Evento Fisco 400120",
    descricao: "Cancelamento Evento Fisco 400120"
  },
  "500101": {
    nome: "Cancelamento Evento Fisco 500100",
    descricao: "Cancelamento Evento Fisco 500100"
  },
  "500105": {
    nome: "Cancelamento Evento Fisco 500104",
    descricao: "Cancelamento Evento Fisco 500104"
  },
  "790700": {
    nome: "Averbação de Exportacao",
    descricao: `Evento que indica a quantidade de mercadoria na 
unidade tributável que foi efetivamente 
embarcada para o exterior referente a um 
certo item de uma NF-e.  
• Gerado e enviado pelo sistema Portal Único do 
Comércio Exterior (PUCOMEX) Receita Federal do 
Brasil (RFB) para o Ambiente Nacional da NF-e`
  },
  "410300": {
    nome: "NF-e Referenciada",
    descricao: `
      O evento da Nota Fiscal Referenciada é gerado 
sempre que uma nova NF-e referenciar uma 
ou mais outras Notas Fiscais Eletrônicas.  
• Não são gerados eventos de "NF-e Referenciada" 
para os documentos diferentes do Modelo 55
    `
  },
  "610510": {
    nome: "Registro de Passagem MDF-e",
    descricao: `
      Registro de Passagem do MDF-e no Posto Fiscal, 
propagado pelo Sistema MDF-e
    `
  },
  "610511": {
    nome: "Cancelamento Registro de Passagem MDF-e",
    descricao: `
      Cancelamento do evento 610511 
    `
  },
  "610514": {
    nome: "Registro de Passagem MDF-e com CT-e",
    descricao: `
      Registro de Passagem do MDF-e no Posto Fiscal, 
propagado pelo Ambiente Nacional.  
• A Chave de Acesso da NF-e está vinculada a um 
CT-e citado no MDF-e 
    `
  },
  "610515": {
    nome: "Cancelamento Registro de Passagem MDF-e com CT-e",
    descricao: "Cancelamento do evento 610514"
  },
  "610552": {
    nome: "Registro de Passagem Automático MDF-e ",
    descricao: `
      Registro de Passagem do MDF-e capturado de 
forma automática (antena, leitura de placa 
por OCR, etc.), propagado pelo Sistema MDF
e. 
• A Chave de Acesso da NF-e está citada no MDF-e 
    `
  },
  "610554": {
    nome: "Registro de Passagem Automático MDF-e com CT-e",
    descricao: "Cancelamento do evento 610552"
  },
  "610600": {
    nome: "CT-e Autorizado ",
    descricao: `
      Documenta na NF-e a ocorrência de CT-e 
autorizado, no momento do 
compartilhamento do CT-e com o Ambiente 
Nacional.  
• A Chave de Acesso da NF-e está citada no CT-e.
    `
  },
  "610601": {
    nome: "CT-e Cancelado",
    descricao: `
      Documenta na NF-e a ocorrência de cancelamento 
de CT-e autorizado, no momento do 
compartilhamento do evento com o 
Ambiente Nacional.  
• A Chave de Acesso da NF-e está citada no CT-e.
    `
  },
  "610610": {
    nome: "MDF-e Autorizado",
    descricao: `
      Evento que documenta na NF-e a ocorrência de 
MDF-e autorizado. 
• A Chave de Acesso da NF-e está citada no MDF-e. 
    `
  },
  "610611": {
    nome: "MDF-e Cancelado ",
    descricao: `
      Cancelamento do MDF-e  
• A Chave de Acesso da NF-e está citada no MDF-e. 
    `
  },
  "610614": {
    nome: "MDF-e Autorizado com CT-e",
    descricao: `
      Evento que documenta na NF-e a ocorrência de 
MDF-e autorizado.  
• A Chave de Acesso da NF-e está vinculada a um 
CT-e citado no MDF-e. 
    `
  },
  "610615": {
    nome: "Cancelamento do MDF-e Autorizado com CT-e",
    descricao: `
      Cancelamento do evento 610615
    `
  },
  "990900": {
    nome: "Vistoria SUFRAMA",
    descricao: `
      Registro da ocorrência da Vistoria do processo de 
internalização de produtos industrializados de 
origem nacional com isenção de ICMS nas áreas sob 
controle da SUFRAMA. 
    `
  },
  "990910": {
    nome: "Internalização SUFRAMA",
    descricao: `
      Confirmação da internalização de produtos 
industrializados de origem nacional com isenção 
de ICMS nas áreas sob controle da SUFRAMA. 
    `
  }
}