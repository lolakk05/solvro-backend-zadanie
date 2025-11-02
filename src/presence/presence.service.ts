import { PrismaService } from "prisma/prisma.service";

import { Injectable } from "@nestjs/common";

import { CreatePresenceDto } from "./dto/create-presence.dto";
import { UpdatePresenceDto } from "./dto/update-presence.dto";

@Injectable()
export class PresenceService {
  constructor(private prisma: PrismaService) {}

  async create(createPresenceDto: CreatePresenceDto) {
    return this.prisma.presence.create({ data: createPresenceDto });
  }

  async findAll() {
    return this.prisma.presence.findMany();
  }

  async findOne(id: number) {
    return this.prisma.presence.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, updatePresenceDto: UpdatePresenceDto) {
    return this.prisma.presence.update({
      where: { id },
      data: updatePresenceDto,
    });
  }

  async remove(id: number) {
    return this.prisma.presence.delete({ where: { id } });
  }
}
