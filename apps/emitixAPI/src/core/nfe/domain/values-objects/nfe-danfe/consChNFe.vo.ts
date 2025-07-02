export class ConsChNFe {
    chNFe: string
    constructor(data: {
        chNFe: string
    }) {
        this.chNFe = data.chNFe
    }
    public toJSON() {
        return {
            chNFe: this.chNFe
        }
    }
}