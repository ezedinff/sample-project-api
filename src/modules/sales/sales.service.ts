import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "src/shared/base.service";
import { BudgetService } from "../budget/budget.service";
import { ProductService } from "../product/services/product.service";
import { Sale } from "./sales";
import { SaleDTO } from "./sales.dto";

@Injectable()
export class SaleService extends BaseService<Sale> {
    constructor(
        @InjectModel(Sale.name) private saleModel: Model<Sale>,
        private productService: ProductService,
        private budgetService: BudgetService) {
        super();
        this._model = saleModel;
    }
    async getSalesWithProducts() {
        return await this.saleModel.find({}).populate("items.product").exec()
    }
    async getSaleWithProducts(id: string) {
        return this.saleModel.findById(id).populate("items.product").exec();
    }
    async addSale(sale: SaleDTO) {
        const { items, totalPrice } = this.processItems(sale.items);
        await this.budgetService.increment(totalPrice);
        return await this.create({ items, totalPrice, cashier: sale.cashier });
    }
    roundToTwo(num) {
        // @ts-ignore
        return +(Math.round(num + "e+2") + "e-2");
    }
    processItems(saleItems) {
        const items = saleItems.map(async (item) => {
            const product = await this.productService.findById(item.product);
            const availableQuantity = product.availableQuantity - item.quantity;
            const totalQuantitySold = product.totalQuantitySold + item.quantity;
            await this.productService.update(item.product, {availableQuantity,totalQuantitySold, isAvailable: (availableQuantity > 0)})
            return { ...item, unitPrice: product.price, subTotal: this.roundToTwo((item.quantity * product.price)) }
        });
        const totalPrice = items.reduce((prv, cr) => prv += cr.subTotal, 0);
        return { items, totalPrice }
    }
}