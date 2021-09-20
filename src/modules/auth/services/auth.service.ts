import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import PasswordService from 'src/modules/user/password.service';
import { UserService } from 'src/modules/user/user.service';
import { Credentials } from '../credentials';
import { TokenService } from './token.service';
import { isEmpty } from 'lodash';
import { messages, TokenType } from '../constants';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}
  async login(credentials: Credentials, response: Response) {
    const user = await this.userService.findOne({
      email: credentials.username,
    });
    if (isEmpty(user))
      throw new HttpException(messages.user_not_found, HttpStatus.NOT_FOUND);
    const isSame = await this.passwordService.comparePasswords(
      credentials.password,
      user.password,
    );
    if (!isSame)
      throw new HttpException(messages.user_not_found, HttpStatus.NOT_FOUND);
    const accessToken = this.tokenService.generateToken(
      TokenType.ACCESS,
      user.get('_id').toString(),
    );
    const newRefreshToken = this.tokenService.generateToken(
      TokenType.REFRESH,
      user.get('_id').toString(),
    );
    await this.userService.update(user._id, { refreshToken: newRefreshToken });
    response.send({
      user: await this.buildUserResponse(user.toObject()),
      access: accessToken,
      refresh: newRefreshToken,
    });
  }
  async buildUserResponse(user: any) {
    delete user.password;
    delete user.__v;
    delete user.refreshToken;
    return user;
  }
  async refreshToken(refreshToken: string) {
    const user = await this.userService.findOne({ refreshToken });
    if (!user) throw new HttpException('invalid token', HttpStatus.FORBIDDEN);
    return this.tokenService.generateToken(
      TokenType.ACCESS,
      user._id.toString(),
    );
  }
}
