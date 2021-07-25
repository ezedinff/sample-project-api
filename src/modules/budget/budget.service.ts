import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "src/shared/base.service";
import { Budget } from "./budget";

@Injectable()
export class BudgetService extends BaseService<Budget> {
    constructor(@InjectModel(Budget.name) private budgetModel: Model<Budget>) {
        super();
        this._model = budgetModel;
        this.init();
    }
    init() {
        this.findAll({}).then(async (budgets) => {
            if(budgets.length <= 0) await this.create({amount: 0});
        });
    }
    async updateBudget(amount: number) {
        const budgets = await this.findAll({});
        return await this.update(budgets[0]._id, {amount});
    }
    async increment(amount: number) {
        const budgets = await this.findAll({});
        return await this.update(budgets[0]._id, {amount: budgets[0].amount + amount});
    }
    async decrement(amount: number) {
        const budgets = await this.findAll({});
        return await this.update(budgets[0]._id, {amount: budgets[0].amount - amount});
    }
}