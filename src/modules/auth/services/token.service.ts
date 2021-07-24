import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { JWT_ACCESS_TOKEN_SERVICE, JWT_REFRESH_TOKEN_SERVICE, TokenType } from "../constants";
@Injectable()
export class TokenService {
    constructor(
        @Inject(JWT_ACCESS_TOKEN_SERVICE)
        private readonly accessTokenService: JwtService,
        @Inject(JWT_REFRESH_TOKEN_SERVICE)
        private readonly refreshTokenService: JwtService) { }

    generateToken(tokenType: TokenType, userId: string) {
        if (!userId) return;
        if (TokenType.ACCESS) return this.accessTokenService.sign(userId);
        return this.refreshTokenService.sign(userId);
    }
}