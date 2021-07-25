import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Budget, BudgetSchema } from "./budget";
import { BudgetController } from "./budget.controller";
import { BudgetService } from "./budget.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Budget.name, schema: BudgetSchema}
        ])
    ],
    controllers: [BudgetController],
    providers: [BudgetService],
    exports: [BudgetService]
})
export class BudgetModule {}