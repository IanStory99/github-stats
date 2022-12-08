import { FormatterInterface } from "@/domain/interfaces/entities";
import { FormatEntity } from "@/domain/entities";

class CSVFormatter implements FormatterInterface {
  format(value: object): FormatEntity {
    const csv = require('csv-tools');
    const csvData = csv.fromJSON(value);
    const saveToFileFunction = () => {
      this.saveCSVStringToFile(csvData, 'output.csv');
    }
    return new FormatEntity('csv', csvData, saveToFileFunction);
  }

  private saveCSVStringToFile(csvString: string, fileName: string) {
    const fs = require('fs');
    fs
      .writeFileSync(fileName, csvString)
      .then(() => {
        console.log('File saved successfully!');
      });
  }
}

export default CSVFormatter;
