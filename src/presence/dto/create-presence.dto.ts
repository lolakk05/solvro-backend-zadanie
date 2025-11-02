import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePresenceDto {
  @ApiProperty({
    example: "2025-09-30T08:30:00.000Z",
    description: "Date of the presence record",
  })
  @Type(() => Date)
  @IsDateString()
  date: Date;

  @ApiProperty({
    example: true,
    description: "Indicates whether the member was present",
  })
  @IsBoolean()
  isPresent: boolean;

  @ApiPropertyOptional({
    example: "Arrived 10 minutes late",
    description: "Optional comment",
    required: false,
  })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({
    example: 15,
    description: "ID of the related member",
  })
  @IsInt()
  @IsNotEmpty()
  membersId: number;
}
