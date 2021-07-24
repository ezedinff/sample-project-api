import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import PasswordService from "src/modules/user/password.service";
import { UserService } from "src/modules/user/user.service";
import { Credentials } from "../credentials";
import { TokenService } from "./token.service";
import { isEmpty } from 'lodash';
import * as moment from "moment";
import { ACCESS_TOKEN_EXPIRE_TIME, cookieNames, messages, REFRESH_TOKEN_EXPIRE_TIME, TokenType } from "../constants";
import { Response } from "express";
@Injectable()
export class AuthService {
    constructor(
        private readonly passwordService: PasswordService,
        private readonly tokenService: TokenService,
        private readonly userService: UserService) { }
    async login(credentials: Credentials, response: Response) {
        const { username, password } = credentials;
        const user = await this.userService.findOne({ username });
        if (isEmpty(user)) throw new HttpException(messages.user_not_found, HttpStatus.NOT_FOUND);
        const isSame = await this.passwordService.comparePasswords(password, user.password);
        if (!isSame) throw new HttpException(messages.user_not_found, HttpStatus.NOT_FOUND);
        const accessToken = this.tokenService.generateToken(TokenType.ACCESS, user._id);
        const refreshToken = this.tokenService.generateToken(TokenType.REFRESH, user._id);
        await this.userService.update(user._id, { refreshToken });
        response.cookie(cookieNames.ACCESS_TOKEN, accessToken, { expires: moment().add(ACCESS_TOKEN_EXPIRE_TIME, 'ms').toDate() });
        response.cookie(cookieNames.REFRESH_TOKEN, refreshToken, { expires: moment().add(REFRESH_TOKEN_EXPIRE_TIME, 'ms').toDate() })
        delete user.password;
        return user;
    }
}