import { PrismaService } from "prisma/prisma.service";

import { Injectable } from "@nestjs/common";

import { CreateBudgetDto } from "./dto/create-budget.dto";
import { UpdateBudgetDto } from "./dto/update-budget.dto";

@Injectable()
export class BudgetService {
  constructor(private prisma: PrismaService) {}

  async create(createBudgetDto: CreateBudgetDto) {
    return this.prisma.budget.create({ data: createBudgetDto });
  }

  async findAll() {
    return this.prisma.budget.findMany();
  }

  async findOne(id: number) {
    return this.prisma.budget.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, updateBudgetDto: UpdateBudgetDto) {
    return this.prisma.budget.update({
      where: { id },
      data: updateBudgetDto,
    });
  }

  async remove(id: number) {
    return this.prisma.budget.delete({ where: { id } });
  }
}
