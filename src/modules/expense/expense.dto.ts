import { ApiProperty } from "@nestjs/swagger";

export class ExpenseDTO {
    @ApiProperty({ type: Number, required: true })
    amount: number;
    @ApiProperty({ type: Number, required: true })
    reason: string;
}