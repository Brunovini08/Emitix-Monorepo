export class IPINTVO {
  public CST: string;

  constructor(data: {
    CST: string
  }) {
    this.CST = data.CST;
  }

  validateOrThrow() {
    if (this.CST === undefined || this.CST === null) {
      throw new Error('CST is required.');
    }

    const validCSTs = ['01', '02', '03', '04', '05', '51', '52', '53', '54', '55'];
    if (!validCSTs.includes(this.CST)) {
      throw new Error(`CST must be one of the following values: ${validCSTs.join(', ')}`);
    }
  }

  toJson() {
    return {
      CST: this.CST,
    };
  }
}