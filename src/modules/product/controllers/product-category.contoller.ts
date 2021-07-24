import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductCategoryService } from "../services/product-category.service";

@Controller('product-categories')
export class ProductCategoryController {
    constructor(private productCategoryService: ProductCategoryService) { }
    @Post()
    async create(@Body() category) {
        return await this.productCategoryService.create(category);
    }

    @Get()
    async findAll() {
        return await this.productCategoryService.findAll({});
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return await this.productCategoryService.findById(id);
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() updates) {
        return await this.productCategoryService.update(id, updates);
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        return await this.productCategoryService.deleteById(id);
    }
}