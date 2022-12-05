class FormatEntity {
  private formatType: string;
  private formatData: any;

  constructor(formatType: string, formatData: any) {
    this.formatType = formatType;
    this.formatData = formatData;
  }

  getFormatType() {
    return this.formatType;
  }

  getFormatData() {
    return this.formatData;
  }

  setFormatType(formatType: string) {
    this.formatType = formatType;
  }

  setFormatData(formatData: any) {
    this.formatData = formatData;
  }
}

export default FormatEntity;
