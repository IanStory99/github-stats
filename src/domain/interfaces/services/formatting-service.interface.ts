import { FormatEntity } from "@/domain/entities";

interface FormattingServiceInterface {
  format(value: any): FormatEntity;
}

export default FormattingServiceInterface;
