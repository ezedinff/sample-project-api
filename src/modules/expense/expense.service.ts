import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "src/shared/base.service";
import { Expense } from "./expense";

@Injectable()
export class ExpenseService extends BaseService<Expense> {
    constructor(
        @InjectModel(Expense.name) expenseModel: Model<Expense>
    ) {
        super();
        this._model = expenseModel;
    }
}