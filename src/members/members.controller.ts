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
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";

import { ErrorResponse } from "../common/error-response.schema";
import { CreateMemberDto } from "./dto/create-member.dto";
import { UpdateMemberDto } from "./dto/update-member.dto";
import { MemberEntity } from "./entities/member.entity";
import { MembersService } from "./members.service";

@ApiTags("Members")
@Controller("members")
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new member",
    description:
      "Creates a single member. Returns the created entity on success. Validation errors result in 400.",
  })
  @ApiBody({
    description: "Member payload",
    type: CreateMemberDto,
    examples: {
      minimal: {
        summary: "Minimal payload",
        value: { name: "Genowefa", surname: "Derpieński" },
      },
      full: {
        summary: "Full payload",
        value: {
          name: "Genowefa",
          surname: "Derpieński",
          email: "genowefa_derpieński@gmail.com",
          indeks: 272_633,
          fieldOfStudy: "Systems Engineering",
          section: "Marketing and Social Media",
        },
      },
    },
  })
  @ApiCreatedResponse({ description: "Member created", type: MemberEntity })
  @ApiBadRequestResponse({
    description: "Validation error",
    type: ErrorResponse,
  })
  async create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all members",
    description: "Returns a list of all members.",
  })
  @ApiOkResponse({ description: "OK", type: [MemberEntity] })
  async findAll() {
    return this.membersService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a single member by ID",
    description: "Returns member details by ID.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    example: 42,
    description: "Member ID (integer > 0)",
  })
  @ApiOkResponse({ description: "OK", type: MemberEntity })
  @ApiNotFoundResponse({
    description: "Member not found",
    type: ErrorResponse,
  })
  @ApiBadRequestResponse({
    description: "Invalid ID (validation error)",
    type: ErrorResponse,
  })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.membersService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a member",
    description: "Updates an existing member. All fields are optional.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    example: 42,
    description: "Member ID",
  })
  @ApiBody({
    description: "Partial update payload",
    type: UpdateMemberDto,
    examples: {
      rename: {
        summary: "Change name and surname",
        value: { name: "Andrzej", surname: "Prorektor" },
      },
      contact: {
        summary: "Update contact and section",
        value: { email: "andrzej_prorektor@outlook.com", section: "Frontend" },
      },
      academic: {
        summary: "Update academic data",
        value: { indeks: 272_111, fieldOfStudy: "Applied Computer Science" },
      },
    },
  })
  @ApiOkResponse({ description: "Member updated", type: MemberEntity })
  @ApiBadRequestResponse({
    description: "Validation error",
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    description: "Member not found",
    type: ErrorResponse,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.membersService.update(id, updateMemberDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a member",
    description:
      "Deletes the member by ID. Returns 204 No Content on success; 404 if not found.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    example: 42,
    description: "Member ID",
  })
  @ApiNoContentResponse({ description: "Member deleted" })
  @ApiNotFoundResponse({
    description: "Member not found",
    type: ErrorResponse,
  })
  async remove(@Param("id", ParseIntPipe) id: number) {
    await this.membersService.remove(id);
  }
}
