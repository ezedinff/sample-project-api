import { ApiProperty } from '@nestjs/swagger';

class SaleItem {
  @ApiProperty({ type: String, required: true, description: 'Id of product' })
  product: string;
  @ApiProperty({ type: Number, required: true })
  quantity: number;
}
export class SaleDTO {
  @ApiProperty({ type: [SaleItem], required: true })
  items: SaleItem[];
}
