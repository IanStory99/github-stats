import { IsString, IsDate } from "class-validator";

class OrganizationInputDto {
  @IsString()
  name: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}

export default OrganizationInputDto;
