/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FormattingServiceInterface } from "@/domain/interfaces/services";
import { FormatterInterface } from "@/domain/interfaces/entities";

class FormattingService implements FormattingServiceInterface {
  private formatter: FormatterInterface;

  constructor(formatter: FormatterInterface) {
    this.formatter = formatter;
  }

  // @ts-ignore
  format(value: JSON) {
    // ...
  }
}

export default FormattingService;
