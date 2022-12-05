import { FormattingServiceInterface } from "@/domain/interfaces/services";

class FormattingService implements FormattingServiceInterface {
  private formatter: FormatterInterface;

  constructor(formatter: FormatterInterface) {
    this.formatter = formatter;
  }

  format(value: JSON) {
    // ...
  }
}

export default FormattingService;
