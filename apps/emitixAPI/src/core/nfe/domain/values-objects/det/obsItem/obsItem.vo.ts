import type { ObsContent } from "./obsCont.vo";
import type { ObsFisco } from "./obsFisco.vo";

export class ObsItem {
  public readonly obsCont: ObsContent;
  public readonly obsFisco: ObsFisco;

  constructor(data: {
    obsCont,
    obsFisco
  }) {
    this.obsCont = data.obsCont 
    this.obsFisco = data.obsFisco 

    this.validateOrThrow();
    Object.freeze(this);
  }

  public validateOrThrow() {
    if (this.obsCont) {
      this.obsCont.validateOrThrow();
    }

    if (this.obsFisco) {
      this.obsFisco.validateOrThrow();
    }
  }

  public equals(other) {
    if (!(other instanceof ObsItem)) {
      return false;
    }
    return (
      (this.obsCont ? this.obsCont.equals(other.obsCont) : this.obsCont === other.obsCont) &&
      (this.obsFisco ? this.obsFisco.equals(other.obsFisco) : this.obsFisco === other.obsFisco)
    );
  }

  public toJSON() {
    return {
      obsCont: this.obsCont ? this.obsCont.toJSON() : null,
      obsFisco: this.obsFisco ? this.obsFisco.toJSON() : null,
    };
  }
}