import { Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/base.service";
import { Sale } from "./sales";

@Injectable()
export class SaleService extends BaseService<Sale> {

}