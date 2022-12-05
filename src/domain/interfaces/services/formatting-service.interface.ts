import FormatterInterface from "@/domain/interfaces/entities/formatter.interface";

interface FormattingServiceInterface {
  new(formatter: FormatterInterface);
  format(value: JSON);
}

export default FormattingServiceInterface;
