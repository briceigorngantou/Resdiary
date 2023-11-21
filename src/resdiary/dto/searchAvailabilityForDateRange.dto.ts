import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export enum availabilityType {
  Reservation = "Reservation",
  Takeaway = "Takeaway",
}
export class SearchAvailabilityForDateRangeDto {
  @ApiProperty({ default: "2023-05-16" })
  @IsNotEmpty()
  @IsDate()
  DateFrom: string;

  @ApiProperty({ default: "2023-05-19" })
  @IsNotEmpty()
  @IsDate()
  DateTo: string;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsNumber()
  PartySize: number;

  @ApiProperty({ default: "ONLINE" })
  @IsNotEmpty()
  ChannelCode: string;

  @ApiProperty({ default: "Reservation" })
  @IsNotEmpty()
  @IsEnum(availabilityType)
  AvailabilityType: string;
}
