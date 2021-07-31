import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BudgetModule } from '../budget/budget.module';
import { ProductModule } from '../product/product.module';
import { Sale, SaleSchema } from './sales';
import { SaleController } from './sales.controller';
import { SaleService } from './sales.service';

@Module({
  controllers: [SaleController],
  imports: [
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
    ProductModule,
    BudgetModule,
  ],
  providers: [SaleService],
  exports: [SaleService],
})
export class SalesModule {}
