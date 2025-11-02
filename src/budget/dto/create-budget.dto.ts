import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateBudgetDto {
  @ApiProperty({
    example: "Microsoft Azure Subscription",
    description: "A unique name for the budget item",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 999.99,
    description: "Price in PLN",
  })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiPropertyOptional({
    example: 12,
    required: false,
    description: "Connected member ID (if applicable)",
  })
  @IsInt()
  @IsOptional()
  membersId?: number;
}
