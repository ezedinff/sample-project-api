import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
    ApiBearerAuth,
    ApiCookieAuth,
    ApiOkResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { cookieNames } from "src/modules/auth/constants";
import { Role } from "src/modules/user/user";
import { Roles } from "src/shared/decorators/role";
import { RolesGuard } from "src/shared/guards/role.guard";
import { ProductDTO } from "../dto/product.dto";
import { ProductService } from "../services/product.service";

@Controller('products')
@ApiBearerAuth()
@ApiTags('Products')
@UseGuards(RolesGuard, AuthGuard("jwt"))
export class ProductController {
    constructor(private productService: ProductService) { }

    @Post()
    @ApiOperation({ summary: "Create New Product" })
    @ApiResponse({ status: HttpStatus.CREATED })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
    @Roles(Role.MANAGER)
    async create(@Body() product: ProductDTO) {
        return await this.productService.create(product);
    }
    @Get()
    @ApiOkResponse({})
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
    async findAll() {
        return await this.productService.getAllWithIngredients();
    }
    @Get(":id")
    @ApiOkResponse({})
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
    @Roles(Role.MANAGER)
    async findOne(@Param("id") id: string) {
        return await this.productService.getOneWithIngredients(id);
    }

    @ApiOkResponse({})
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
    @Patch(":id")
    @Roles(Role.MANAGER)
    async update(@Param("id") id: string, @Body() update: Partial<ProductDTO>) {
        return await this.productService.update(id, update)
    }

    @ApiOkResponse({})
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
    @Delete(":id")
    @Roles(Role.MANAGER)
    async remove(@Param("id") id: string) {
        return await this.productService.deleteById(id);
    }
}