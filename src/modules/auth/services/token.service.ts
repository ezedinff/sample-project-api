import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  JWT_ACCESS_TOKEN_SERVICE,
  JWT_REFRESH_TOKEN_SERVICE,
  TokenType,
} from '../constants';
@Injectable()
export class TokenService {
  constructor(
    private readonly accessTokenService: JwtService,
    private readonly refreshTokenService: JwtService,
  ) {}

  generateToken(tokenType: TokenType, userId: string) {
    if (!userId) return;
    if (TokenType.ACCESS) return this.accessTokenService.sign(userId);
    return this.refreshTokenService.sign(userId);
  }
}
