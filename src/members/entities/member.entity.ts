import { Members } from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";

export class MemberEntity implements Members {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty({ required: false, nullable: true })
  email: string | null;

  @ApiProperty({ required: false, nullable: true })
  indeks: number | null;

  @ApiProperty({ required: false, nullable: true })
  fieldOfSTudy: string | null;

  @ApiProperty({ required: false, nullable: true })
  section: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
