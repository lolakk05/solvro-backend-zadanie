import { PrismaService } from "prisma/prisma.service";

import { Injectable } from "@nestjs/common";

import { CreatePartnerDto } from "./dto/create-partner.dto";
import { UpdatePartnerDto } from "./dto/update-partner.dto";

@Injectable()
export class PartnersService {
  constructor(private prisma: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto) {
    return this.prisma.partners.create({ data: createPartnerDto });
  }

  async findAll() {
    return this.prisma.partners.findMany();
  }

  async findOne(id: number) {
    return this.prisma.partners.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, updatePartnerDto: UpdatePartnerDto) {
    return this.prisma.partners.update({
      where: { id },
      data: updatePartnerDto,
    });
  }

  async remove(id: number) {
    return this.prisma.partners.delete({ where: { id } });
  }
}
