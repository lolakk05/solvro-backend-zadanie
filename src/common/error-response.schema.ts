import { ApiProperty } from "@nestjs/swagger";

export class ErrorResponse {
  @ApiProperty({ example: 400, description: "Kod statusu HTTP" })
  statusCode: number;

  @ApiProperty({
    example: "Walidacja nie powiodła się: podane pole jest wymagane",
    description: "Opis błędu",
  })
  message: string | string[];

  @ApiProperty({ example: "Bad Request", description: "Nazwa błędu HTTP" })
  error: string;
}
