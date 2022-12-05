import { FormatterInterface } from "@/domain/interfaces/entities";

class CSVFormatter implements FormatterInterface {
  format(value: JSON) {
    // ...
  }
}

export default CSVFormatter;
