import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductIngredientService } from "../services/product-ingredient.service";

@Controller('product-ingredients')
export class ProductIngredientController {
    constructor(private productIngredientService: ProductIngredientService) { }
    @Post()
    async create(@Body() ingredient) {
        return await this.productIngredientService.create(ingredient);
    }

    @Get()
    async findAll() {
        return await this.productIngredientService.findAll({});
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return await this.productIngredientService.findById(id);
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() updates) {
        return await this.productIngredientService.update(id, updates);
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        return await this.productIngredientService.deleteById(id);
    }
}