import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, isDate } from "class-validator";

export class StandardBookingDto {
  @ApiProperty({ default: "2023-05-17" })
  @IsNotEmpty()
  @IsDate()
  VisitDate: Date;

  @ApiProperty({ default: " 18:30:00" })
  @IsNotEmpty()
  @IsDate()
  VisitTime: Date;

  @ApiProperty({ default: "ONLINE" })
  @IsNotEmpty()
  ChannelCode: string;

  @ApiProperty({ default: "I would like to have a booth if possible" })
  @IsNotEmpty()
  SpecialRequests: string;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsNumber()
  PartySize: number;

  @ApiProperty({ default: "John" })
  @IsNotEmpty()
  FirstName: string;

  @ApiProperty({ default: "john.smith@example.com" })
  @IsNotEmpty()
  Email: string;

  @ApiProperty({ default: "Doe" })
  @IsNotEmpty()
  Surname: string;

  @ApiProperty({ default: 237 })
  @IsNotEmpty()
  PhoneCountryCode: number;

  @ApiProperty({ default: "625554411" })
  @IsNotEmpty()
  Phone: string;
}
