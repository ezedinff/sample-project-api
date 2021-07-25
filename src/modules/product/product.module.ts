import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductIngredientController } from "./controllers/product-ingredient.controller";
import { ProductController } from "./controllers/product.controller";
import { Product, ProductSchema } from "./product";
import { ProductIngredient, ProductIngredientSchema } from "./product-ingredient";
import { ProductIngredientService } from "./services/product-ingredient.service";
import { ProductService } from "./services/product.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ProductIngredient.name, schema: ProductIngredientSchema },
            { name: Product.name, schema: ProductSchema },
        ])
    ],
    controllers: [
        ProductController,
        ProductIngredientController
    ],
    providers: [
        ProductService,
        ProductIngredientService
    ],
    exports: [
        ProductService
    ]
})
export class ProductModule { }