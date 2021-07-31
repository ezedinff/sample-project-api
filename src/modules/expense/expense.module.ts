import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BudgetModule } from '../budget/budget.module';
import { Expense, ExpenseSchema } from './expense';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';

@Module({
  controllers: [ExpenseController],
  imports: [
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }]),
    BudgetModule,
  ],
  providers: [ExpenseService],
  exports: [ExpenseService],
})
export class ExpenseModule {}
