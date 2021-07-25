import { ApiProperty } from "@nestjs/swagger";
import { Role } from "./user";

export class UserDTO {
    @ApiProperty({ type: String, required: true })
    firstName: string;
    @ApiProperty({ type: String, required: true })
    lastName: string;
    @ApiProperty({ type: String, required: true })
    username: string;
    @ApiProperty({ type: String, required: true })
    password: string;
    @ApiProperty({ type: String, enum: Role, required: true })
    role: Role;
}