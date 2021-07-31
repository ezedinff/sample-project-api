import { Injectable } from '@nestjs/common';
import { BudgetService } from './modules/budget/budget.service';
import { ExpenseService } from './modules/expense/expense.service';
import { SaleService } from './modules/sales/sales.service';

@Injectable()
export class AppService {
  constructor(
    private readonly salesService: SaleService,
    private readonly budgetService: BudgetService,
    private readonly expenseService: ExpenseService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async dashboard() {
    const [sales, budgets, expenses] = await Promise.all([
      this.salesService.salesReport(),
      this.budgetService.findAll({}),
      this.expenseService.findAll({}),
    ]);
    const totalSales = sales.reduce((pr, cr) => (pr += cr.total), 0);
    const totalExpense = expenses.reduce((pr, cr) => (pr += cr.amount), 0);
    const profit =
      totalSales - totalExpense <= 0 ? 0.0 : totalExpense - totalSales;
    const loss =
      totalExpense - totalSales <= 0 ? 0.0 : totalExpense - totalSales;
    return {
      boards: [
        { label: 'Budget', value: budgets[0].amount },
        { label: 'Sales', value: totalSales },
        { label: 'Profit', value: profit },
        { label: 'Loss', value: loss },
      ],
      tops: [
        { label: 'Dabo one', value: 63 },
        { label: 'Dabo two', value: 53 },
        { label: 'Dabo three', value: 23 },
      ],
      sales: sales.map((sale) => ({ label: sale._id, value: sale.total })),
    };
  }
}
