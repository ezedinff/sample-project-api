import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "src/shared/base.service";
import { ProductCategory } from "../product-category";

@Injectable()
export class ProductCategoryService extends BaseService<ProductCategory> {
    constructor(@InjectModel(ProductCategory.name) productCategoryModel: Model<ProductCategory>) {
        super()
        this._model = productCategoryModel;
    }
}