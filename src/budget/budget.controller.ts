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
import { BudgetService } from "./budget.service";
import { CreateBudgetDto } from "./dto/create-budget.dto";
import { UpdateBudgetDto } from "./dto/update-budget.dto";
import { BudgetEntity } from "./entities/budget.entity";

@ApiTags("Budget")
@Controller("budget")
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  @ApiOperation({
    summary: "Create new budget item",
    description: "Creates single budget item.",
  })
  @ApiBody({
    description: "Budget item details",
    type: CreateBudgetDto,
    examples: {
      minimal: {
        summary: "Minimal example",
        value: { name: "Microsoft Azure Subscription", amount: 49.99 },
      },
      withMember: {
        summary: "With pinned member",
        value: { name: "S3 Service", amount: 129.5, membersId: 7 },
      },
    },
  })
  @ApiCreatedResponse({
    description: "Budget item has been created",
    type: BudgetEntity,
  })
  @ApiBadRequestResponse({
    description: "Error in validating the input",
    type: ErrorResponse,
  })
  async create(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetService.create(createBudgetDto);
  }

  @Get()
  @ApiOperation({
    summary: "Download all the budget items",
    description: "Returns full budget items list",
  })
  @ApiOkResponse({
    description: "Budget items list",
    type: [BudgetEntity],
  })
  async findAll() {
    return this.budgetService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get single budget item",
    description: "Returns the details of the item based on its ID.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    example: 42,
    description: "Budget item ID (integer > 0)",
  })
  @ApiOkResponse({
    description: "Item with given ID has been found",
    type: BudgetEntity,
  })
  @ApiNotFoundResponse({
    description: "Item with given ID not found",
    type: ErrorResponse,
  })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.budgetService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update budget item",
    description:
      "Updates selected budget item. Each of the fields is optional.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    example: 42,
    description: "Budget item ID",
  })
  @ApiBody({
    description: "Data provided to update budget item",
    type: UpdateBudgetDto,
    examples: {
      rename: {
        summary: "Name change",
        value: { name: "AWS monthly subscription" },
      },
      changeAmount: {
        summary: "Amount change",
        value: { amount: 199.99 },
      },
      reassignMember: {
        summary: "Pinning to another member",
        value: { membersId: 12 },
      },
      complex: {
        summary: "Multiple fields",
        value: { name: "S3 storage", amount: 129.5, membersId: 7 },
      },
    },
  })
  @ApiOkResponse({
    description: "Updated budget item.",
    type: BudgetEntity,
  })
  @ApiNotFoundResponse({
    description: "Item not found",
    type: ErrorResponse,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ) {
    return this.budgetService.update(id, updateBudgetDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Usuń pozycję budżetową",
    description:
      "Deletes budget item with given ID. If an item does not exist, returns 404.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    example: 42,
    description: "ID pozycji budżetowej",
  })
  @ApiNoContentResponse({
    description: "Deleted budget item",
  })
  @ApiNotFoundResponse({
    description: "Budget item not found",
    type: ErrorResponse,
  })
  async remove(@Param("id", ParseIntPipe) id: number) {
    await this.budgetService.remove(id);
  }
}
