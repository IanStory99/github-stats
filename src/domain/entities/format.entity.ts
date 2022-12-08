class FormatEntity {
  private formatType: string;
  private formatData: any;
  private saveToFileFunction: Function;

  constructor(formatType: string, formatData: any, saveToFileFunction: Function) {
    this.formatType = formatType;
    this.formatData = formatData;
    this.saveToFileFunction = saveToFileFunction;
  }

  getFormatType() {
    return this.formatType;
  }

  getFormatData() {
    return this.formatData;
  }

  getSaveToFileFunction() {
    return this.saveToFileFunction;
  }

  saveToFile() {
    return this.saveToFileFunction();
  }

  setFormatType(formatType: string) {
    this.formatType = formatType;
  }

  setFormatData(formatData: any) {
    this.formatData = formatData;
  }

  setSaveToFileFunction(saveToFileFunction: Function) {
    this.saveToFileFunction = saveToFileFunction;
  }
}

export default FormatEntity;
