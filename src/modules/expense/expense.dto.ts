import { ApiProperty } from "@nestjs/swagger";

export class ExpenseDTO {
    @ApiProperty({ type: Number, required: true })
    amount: number;
    @ApiProperty({ type: String, required: true })
    reason: string;
}