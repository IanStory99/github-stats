import { FormatEntity } from "@/domain/entities";

interface FormatterInterface {
  format(value: any): FormatEntity;
}

export default FormatterInterface;
