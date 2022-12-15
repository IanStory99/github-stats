/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FormattingServiceInterface } from "@/domain/interfaces/services";
import { FormatterInterface } from "@/domain/interfaces/entities";
import { FormatEntity } from "@/domain/entities";

// @ts-ignore
class FormattingService implements FormattingServiceInterface {
  private formatter: FormatterInterface;

  constructor(formatter: FormatterInterface) {
    this.formatter = formatter;
  }

  format(value: any): FormatEntity {
    return this.formatter.format(value);
  }
}

export default FormattingService;
