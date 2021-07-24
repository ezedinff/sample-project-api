import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "src/shared/base.service";
import { Product } from "../product";

@Injectable()
export class ProductService extends BaseService<Product> {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {
        super()
        this._model = productModel;
    }
}