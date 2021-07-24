import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { isEmpty } from 'lodash';
@Injectable()
export default class PasswordService {
    hashPassword(cleanPassword: string) {
        if (isEmpty(cleanPassword))
            throw new HttpException('password is invalid length', HttpStatus.BAD_REQUEST);
        return bcrypt.hash(cleanPassword, 10);
    }
    async comparePasswords(cleanPassword: string, hashedPassword: string) {
        return await bcrypt.compare(cleanPassword, hashedPassword);
    }
}