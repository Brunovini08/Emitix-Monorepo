export interface NfeDanfeJsonInterface {
    distDFeInt: {
        versao: string,
        tpAmb: string,
        cUFAutor?: string,
        CNPJ?: string,
        CPF?: string,
        distNSU?: {
            ultNSU: string
        },
        consNSU?: {
            NSU: string
        },
        consChNFe?: {
            chNFe: string
        }
    }
}