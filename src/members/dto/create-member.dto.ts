import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateMemberDto {
  @ApiProperty({ example: "Genowefa", description: "First name of the member" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Derpieński",
    description: "Last name of the member",
  })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiPropertyOptional({
    example: "genowefa_derpienski@gmail.com",
    description: "Contact email (optional)",
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    example: 272_355,
    description: "Student ID number (optional, integer)",
    required: false,
  })
  @IsInt()
  @IsOptional()
  indeks?: number;

  @ApiPropertyOptional({
    example: "Systems Engineering",
    description: "Field of study (optional)",
    required: false,
  })
  @IsString()
  @IsOptional()
  fieldOfStudy?: string;

  @ApiPropertyOptional({
    example: "Marketing and Social Media",
    description: "Team name (optional)",
    required: false,
  })
  @IsString()
  @IsOptional()
  section?: string;
}
