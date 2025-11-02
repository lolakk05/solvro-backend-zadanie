import { PrismaService } from "prisma/prisma.service";

import { Injectable } from "@nestjs/common";

import { CreateMemberDto } from "./dto/create-member.dto";
import { UpdateMemberDto } from "./dto/update-member.dto";

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async create(createMemberDto: CreateMemberDto) {
    return this.prisma.members.create({ data: createMemberDto });
  }

  async findAll() {
    return this.prisma.members.findMany();
  }

  async findOne(id: number) {
    return this.prisma.members.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    return this.prisma.members.update({
      where: { id },
      data: updateMemberDto,
    });
  }

  async remove(id: number) {
    return this.prisma.members.delete({ where: { id } });
  }
}
