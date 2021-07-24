import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "src/shared/base.service";
import { ProductIngredient } from "../product-ingredient";

@Injectable()
export class ProductIngredientService extends BaseService<ProductIngredient> {
    constructor(@InjectModel(ProductIngredient.name) productIngredientModel: Model<ProductIngredient>) {
        super()
        this._model = productIngredientModel;
    }
}