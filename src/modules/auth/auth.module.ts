import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import {
  JWT_ACCESS_TOKEN_SERVICE,
  JWT_REFRESH_TOKEN_SERVICE,
} from './constants';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import JwtRefreshStrategy from './strategies/jwt-refresh.strategy';
import JwtStrategy from './strategies/jwt.strategy';
const jwtServiceFactory = (secret, signOptions = {}) =>
  new JwtService({
    secret,
    signOptions,
  });
@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule,
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  providers: [TokenService, AuthService, JwtStrategy, JwtRefreshStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
