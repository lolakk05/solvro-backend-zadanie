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
import { CreatePresenceDto } from "./dto/create-presence.dto";
import { UpdatePresenceDto } from "./dto/update-presence.dto";
import { PresenceEntity } from "./entities/presence.entity";
import { PresenceService } from "./presence.service";

@ApiTags("Presence")
@Controller("presence")
export class PresenceController {
  constructor(private readonly presenceService: PresenceService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new presence record",
    description: "Creates a presence record for a given member and date.",
  })
  @ApiBody({
    description: "Presence record payload",
    type: CreatePresenceDto,
    examples: {
      minimal: {
        summary: "Minimal payload",
        value: {
          date: "2025-09-30T08:30:00.000Z",
          isPresent: true,
          membersId: 15,
        },
      },
      withComment: {
        summary: "With a comment",
        value: {
          date: "2025-09-30T08:30:00.000Z",
          isPresent: false,
          comment: "Sick leave",
          membersId: 15,
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: "Presence record created",
    type: PresenceEntity,
  })
  @ApiBadRequestResponse({
    description: "Validation error",
    type: ErrorResponse,
  })
  async create(@Body() createPresenceDto: CreatePresenceDto) {
    return this.presenceService.create(createPresenceDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all presence records",
    description: "Returns a list of all presence records.",
  })
  @ApiOkResponse({ description: "OK", type: [PresenceEntity] })
  async findAll() {
    return this.presenceService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a single presence record by ID",
    description: "Returns presence details by numeric ID.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    example: 42,
    description: "Presence record ID (integer > 0)",
  })
  @ApiOkResponse({ description: "OK", type: PresenceEntity })
  @ApiNotFoundResponse({
    description: "Presence record not found",
    type: ErrorResponse,
  })
  @ApiBadRequestResponse({
    description: "Invalid ID (validation error)",
    type: ErrorResponse,
  })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.presenceService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a presence record",
    description:
      "Updates an existing presence record. All fields are optional.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    example: 42,
    description: "Presence record ID",
  })
  @ApiBody({
    description: "Partial update payload",
    type: UpdatePresenceDto,
    examples: {
      markPresent: {
        summary: "Mark as present",
        value: { isPresent: true },
      },
      addComment: {
        summary: "Add a comment",
        value: { comment: "Arrived late" },
      },
    },
  })
  @ApiOkResponse({
    description: "Presence record updated",
    type: PresenceEntity,
  })
  @ApiBadRequestResponse({
    description: "Validation error",
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    description: "Presence record not found",
    type: ErrorResponse,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updatePresenceDto: UpdatePresenceDto,
  ) {
    return this.presenceService.update(id, updatePresenceDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a presence record",
    description: "Deletes the presence record by ID.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    example: 42,
    description: "Presence record ID",
  })
  @ApiOkResponse({
    description: "Presence record deleted",
    type: PresenceEntity,
  })
  @ApiNotFoundResponse({
    description: "Presence record not found",
    type: ErrorResponse,
  })
  @ApiBadRequestResponse({
    description: "Invalid ID (validation error)",
    type: ErrorResponse,
  })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.presenceService.remove(id);
  }
}
