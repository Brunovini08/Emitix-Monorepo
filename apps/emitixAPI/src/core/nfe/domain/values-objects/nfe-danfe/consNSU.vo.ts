export class ConsNSU {
    NSU: string

    constructor(data: {
        NSU: string
    }) {
        this.NSU = data.NSU
    }
    public toJSON() {
        return {
            NSU: this.NSU
        }
    }
}