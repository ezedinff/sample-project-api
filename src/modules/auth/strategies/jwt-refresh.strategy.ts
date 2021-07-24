import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { get } from 'lodash';
import { ConfigService } from '@nestjs/config';
import { cookieNames } from '../constants';
import { UserService } from 'src/modules/user/user.service';
@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    public constructor(
        private readonly userService: UserService,
        protected readonly configService: ConfigService,
    ) {
        super({
            secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
            issuer: configService.get<string>('JWT_ISSUER'),
            audience: configService.get<string>('JWT_AUDIENCE'),
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => get(req, `cookies.${cookieNames.REFRESH_TOKEN}`),
            ]),
        });
    }

    async validate(request, payload) {
        const refreshToken = request.cookies?.Refresh;
        return this.userService.findOne({ refreshToken, _id: payload.sub });
    }
}