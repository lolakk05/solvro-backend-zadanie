import { Members as TestingMembers } from "@prisma/client";

import { Controller, Get, Post } from "@nestjs/common";
import { ApiExcludeController, ApiOperation } from "@nestjs/swagger";

import { DatabaseService } from "./database.service";

@ApiExcludeController()
@Controller("database")
export class DatabaseController {
  constructor(private prisma: DatabaseService) {}

  @Get("/")
  @ApiOperation({ summary: "Example findAll operation" })
  async testRead(): Promise<TestingMembers[]> {
    return this.prisma.members.findMany();
  }

  @Post("/")
  @ApiOperation({ summary: "Example POST operation" })
  async testCreate(): Promise<void> {
    await this.prisma.members.create({
      data: {
        id: 11,
        name: "testName",
        surname: "testSurname",
        email: "test@example.com",
        indeks: 123_456,
        fieldOfSTudy: "Computer Science",
        section: "ML",
      },
    });
  }
}
