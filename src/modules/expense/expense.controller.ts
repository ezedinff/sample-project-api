import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/shared/decorators/role";
import { RolesGuard } from "src/shared/guards/role.guard";
import { cookieNames } from "../auth/constants";
import { BudgetService } from "../budget/budget.service";
import { Role } from "../user/user";
import { ExpenseDTO } from "./expense.dto";
import { ExpenseService } from "./expense.service";

@Controller("expenses")
@ApiCookieAuth(cookieNames.ACCESS_TOKEN)
@ApiTags('Expenses')
@UseGuards(RolesGuard, AuthGuard("jwt"))
export class ExpenseController {
    constructor(private expenseService: ExpenseService,
        private budgetService: BudgetService) { }
    @Post()
    @ApiOperation({ summary: "Create New Expense" })
    @ApiResponse({ status: HttpStatus.CREATED })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
    @Roles(Role.MANAGER)
    async create(@Body() expense: ExpenseDTO) {
        await this.budgetService.decrement(expense.amount);
        return await this.expenseService.create(expense);
    }

    @Get()
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
    @Roles(Role.MANAGER)
    async findAll() {
        return await this.expenseService.findAll({});
    }

    @Get(":id")
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
    @Roles(Role.MANAGER)
    async findOne(@Param("id") id: string) {
        return await this.expenseService.findById(id);
    }

    @Patch(":id")
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
    @Roles(Role.MANAGER)
    async update(@Param("id") id: string, @Body() updates: Partial<ExpenseDTO>) {
        return await this.expenseService.update(id, updates);
    }

    @Delete(":id")
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
    @Roles(Role.MANAGER)
    async remove(@Param("id") id: string) {
        return await this.expenseService.deleteById(id);
    }
}