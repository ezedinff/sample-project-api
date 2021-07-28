import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { get } from 'lodash';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/modules/user/user.service';
import { cookieNames } from '../constants';
@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  public constructor(
    private readonly userService: UserService,
    protected readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      issuer: configService.get<string>('JWT_ISSUER'),
      audience: configService.get<string>('JWT_AUDIENCE'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
    });
  }
  async validate(payload: any) {
    return await this.userService.findById(String(payload.sub));
  }
}
