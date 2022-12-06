import { FormatterInterface } from "@/domain/interfaces/entities";
import { FormatEntity } from "@/domain/entities";

interface FormattingServiceInterface {
  new(formatter: FormatterInterface);
  format(value: JSON): FormatEntity;
}

export default FormattingServiceInterface;
