class FormatEntity {
  private formatType: string;
  private formatData: any;
  private saveToFileFunction: (savePath: string) => void;

  constructor(formatType: string, formatData: any, saveToFileFunction: (savePath: string) => void) {
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

  saveToFile(savePath: string) {
    this.saveToFileFunction(savePath);
  }

  setFormatType(formatType: string) {
    this.formatType = formatType;
  }

  setFormatData(formatData: any) {
    this.formatData = formatData;
  }

  setSaveToFileFunction(saveToFileFunction: (savePath: string) => void) {
    this.saveToFileFunction = saveToFileFunction;
  }
}

export default FormatEntity;
