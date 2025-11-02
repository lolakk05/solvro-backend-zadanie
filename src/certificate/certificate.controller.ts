import type { Response } from "express";

import {
  BadRequestException,
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CertificateService } from "./certificate.service";

@ApiTags("certificates")
@Controller("certificates")
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Post("/generate/all")
  @ApiOperation({ summary: "Generate all avaible certificates" })
  @ApiResponse({
    status: 200,
    description: "Zip File Containg all avaible certificates",
  })
  async generateAll(@Res() response: Response) {
    const zip = await this.certificateService.generateCertificates();

    response.set({
      "Content-Type": "application/zip",
    });

    response.send(zip);
  }

  @Post("/generate/specific")
  @ApiOperation({ summary: "Generate for specific id" })
  @ApiResponse({
    status: 200,
    description: "Zip containg only specific certificates",
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        ids: {
          type: "array",
          items: { type: "number" },
          example: [1, 2, 5],
        },
      },
      required: ["ids"],
    },
  })
  async generateForSpecific(
    @Body("ids") ids: number[],
    @Res() response: Response,
  ) {
    if (ids.length === 0) {
      throw new BadRequestException("Wrong id array");
    }
    const zip = await this.certificateService.generateSpecificCertificate(ids);

    response.set({
      "Content-Type": "application/zip",
    });

    response.send(zip);
  }

  @Post("/generate/:id")
  @ApiOperation({
    summary: "Generate one certificate for user with choosen id",
  })
  @ApiResponse({
    status: 200,
    description: "Zip containg only one certificate",
  })
  @ApiBody({
    schema: {
      type: "number",
      example: 1,
    },
  })
  async generateOne(
    @Param("id", ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    const pdf = await this.certificateService.generateOneCertificate(id);
    response.set({
      "Content-Type": "application/pdf",
    });
    response.send(pdf);
  }
}
