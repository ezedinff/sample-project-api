import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/shared/decorators/user";
import { RolesGuard } from "src/shared/guards/role.guard";
import { cookieNames } from "../auth/constants";
import { SaleDTO } from "./sales.dto";
import { SaleService } from "./sales.service";

@ApiCookieAuth(cookieNames.ACCESS_TOKEN)
@ApiTags('Sales')
@Controller('sales')
@UseGuards(RolesGuard, AuthGuard("jwt"))
export class SaleController {
    constructor(private saleService: SaleService) { }
    @Post()
    @ApiOperation({ summary: "Create New Sale" })
    @ApiResponse({ status: HttpStatus.CREATED })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
    async create(@Body() sale: SaleDTO, @CurrentUser() cashier) {
        return await this.saleService.create({...sale, cashier: cashier._id});
    }

    @Get()
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
    async findAll() {
        return await this.saleService.getSalesWithProducts();
    }

    @Get(":id")
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
    async findOne(@Param("id") id: string) {
        return await this.saleService.getSaleWithProducts(String(id));
    }
}