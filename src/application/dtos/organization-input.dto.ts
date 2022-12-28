import { IsString, IsDate, IsOptional } from "class-validator";

class OrganizationInputDto {
  @IsString({ message: "Organization name must be a string" })
  name: string;

  @IsOptional() @IsDate({ message: "Start date must be a valid date" })
  startDate: Date | null;

  @IsOptional() @IsDate({ message: "End date must be a valid date" })
  endDate: Date | null;

  @IsOptional() @IsString({ message: "Save path must be a string" })
  savePath: string | null;
}

export default OrganizationInputDto;
