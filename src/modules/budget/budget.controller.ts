import { Body, Controller, Get, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/shared/guards/role.guard";
import { cookieNames } from "../auth/constants";
import { BudgetService } from "./budget.service";

@Controller("budget")
@ApiBearerAuth()
@ApiTags('Budget')
@UseGuards(RolesGuard, AuthGuard("jwt"))
export class BudgetController {
    constructor(private budgetService: BudgetService) {}
    @Get()
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
    async getBudget() {
        return await this.budgetService.findAll({})[0];
    }
    @Post()
    @ApiOperation({ summary: "Update the Budget" })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
    async update(@Body() amount: number) {
        return await this.budgetService.updateBudget(amount);
    }
}