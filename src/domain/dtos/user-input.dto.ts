import { IsString, IsDate } from "class-validator";

class UserInputDto {
  @IsString()
  username: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}

export default UserInputDto;
