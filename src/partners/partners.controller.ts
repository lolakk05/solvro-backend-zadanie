import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";

import { ErrorResponse } from "../common/error-response.schema";
import { CreatePartnerDto } from "./dto/create-partner.dto";
import { UpdatePartnerDto } from "./dto/update-partner.dto";
import { PartnerEntity } from "./entities/partner.entity";
import { PartnersService } from "./partners.service";

@ApiTags("Partners")
@Controller("partners")
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new partner",
    description: "Creates a partner.",
  })
  @ApiBody({
    description: "Partner payload",
    type: CreatePartnerDto,
    examples: {
      minimal: {
        summary: "Minimal payload",
        value: { name: "SEO Host", answer: "YES" },
      },
      full: {
        summary: "Full payload",
        value: {
          name: "SEO Host",
          phone: "+48 600 100 100",
          email: "seohost@contact.com",
          answer: "YES",
          membersId: 7,
        },
      },
    },
  })
  @ApiCreatedResponse({ description: "Partner created", type: PartnerEntity })
  @ApiBadRequestResponse({
    description: "Validation error",
    type: ErrorResponse,
  })
  async create(@Body() createPartnerDto: CreatePartnerDto) {
    return this.partnersService.create(createPartnerDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all partners",
    description: "Returns a list of all partners.",
  })
  @ApiOkResponse({ description: "OK", type: [PartnerEntity] })
  async findAll() {
    return this.partnersService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a single partner by ID",
    description: "Returns partner details by ID.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    example: 42,
    description: "Partner ID (integer > 0)",
  })
  @ApiOkResponse({ description: "OK", type: PartnerEntity })
  @ApiNotFoundResponse({
    description: "Partner not found",
    type: ErrorResponse,
  })
  @ApiBadRequestResponse({
    description: "Invalid ID (validation error)",
    type: ErrorResponse,
  })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.partnersService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a partner",
    description: "Updates an existing partner.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    example: 42,
    description: "Partner ID",
  })
  @ApiBody({
    description: "Partial update payload",
    type: UpdatePartnerDto,
    examples: {
      contact: {
        summary: "Update contact info",
        value: { phone: "+48 600 200 300", email: "bocianpozyczki@gmail.com" },
      },
      status: {
        summary: "Change status",
        value: { answer: "NO" },
      },
      linkMember: {
        summary: "Link to different member",
        value: { membersId: 12 },
      },
    },
  })
  @ApiOkResponse({ description: "Partner updated", type: PartnerEntity })
  @ApiBadRequestResponse({
    description: "Validation error",
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    description: "Partner not found",
    type: ErrorResponse,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updatePartnerDto: UpdatePartnerDto,
  ) {
    return this.partnersService.update(id, updatePartnerDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a partner",
    description: "Deletes the partner by ID.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    example: 42,
    description: "Partner ID",
  })
  @ApiOkResponse({ description: "Partner deleted", type: PartnerEntity })
  @ApiNotFoundResponse({
    description: "Partner not found",
    type: ErrorResponse,
  })
  @ApiBadRequestResponse({
    description: "Invalid ID (validation error)",
    type: ErrorResponse,
  })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.partnersService.remove(id);
  }
}
