import { FormatterInterface } from "@/domain/interfaces/entities";
import { FormatEntity } from "@/domain/entities";

class CSVFormatter implements FormatterInterface {
  format(value: object): FormatEntity {
    const csv = require('csv-tools');
    const csvData = csv.fromJSON(value);
    const saveToFileFunction = (savePath: string) => {
      this.saveCSVStringToFile(csvData, this.formatValidCSVPathName(savePath));
    }
    return new FormatEntity('csv', csvData, saveToFileFunction);
  }

  private saveCSVStringToFile(csvString: string, fileName: string) {
    const fs = require('fs');
    fs.writeFileSync(fileName, csvString);
  }

  private formatValidCSVPathName(fileName: string) {
    if (!fileName) {
      return 'output.csv';
    }
    if (fileName.endsWith('/')) {
      return fileName + 'output.csv';
    }
    if (!fileName.endsWith('.csv')) {
      return fileName + '.csv';
    }
    return fileName;
  }
}

export default CSVFormatter;
