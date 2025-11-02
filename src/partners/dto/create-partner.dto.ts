import { Answer } from "@prisma/client";
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePartnerDto {
  @ApiProperty({
    example: "SEO Host",
    description: "Partner organization name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: "+48 600 100 100", //bocian pozyczki to jest to
    description: "Contact phone (optional)",
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    example: "kontakt@seohost.com", // to nie jest ich prawdziwy mail
    description: "Contact email (optional)",
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    enum: Answer,
    enumName: "Answer",
    example: Answer.YES,
    description: "Partner status",
  })
  @IsEnum(Answer)
  answer: Answer;

  @ApiPropertyOptional({
    example: 7,
    description: "Linked member ID assigned to contact with partner (optional)",
    required: false,
  })
  @IsInt()
  @IsOptional()
  membersId?: number;
}
