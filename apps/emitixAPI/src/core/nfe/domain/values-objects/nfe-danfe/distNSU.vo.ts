export class DistNSU {
    ultNSU: string

    constructor(data: {
        ultNSU: string
    }) {
        this.ultNSU = data.ultNSU
    }

    public toJSON() {
        return {
            ultNSU: this.ultNSU
        }
    }
}