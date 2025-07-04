export interface NfeConsultaCadastroJsonInterface {
    ConsCad: {
        versao: string,
        infCons: {
            xServ: string,
            UF: string,
            IE: string,
            CNPJ?: string,
            CPF?: string,
        },
        tpAmb: string,
        cUF: string
    }
}