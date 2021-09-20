import { ApiProperty } from '@nestjs/swagger';
import { Address, Gender, UserRole } from './user';

export class UserDTO {
  firstName!: string;
  lastName!: string;
  email!: string;
  role!: UserRole;
  birthDate!: Date;
  password!: string;
  gender!: Gender;
  address?: Address; // optional
  photo?: string; // optional
}
