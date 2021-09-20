import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/user';
import { UserDTO } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { cookieNames } from './constants';
import { Credentials } from './credentials';
import { AuthService } from './services/auth.service';

class RefreshTokenDTO {
  refreshToken: string;
}
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @ApiOperation({
    description: 'authenticate user using username and password',
  })
  @ApiOkResponse({})
  async authenticate(@Body() credentials: Credentials, @Res() response) {
    await this.authService.login(credentials, response);
  }

  @Post('register')
  @ApiOperation({ description: 'Register new user' })
  @ApiCreatedResponse({})
  async register(@Body() user: UserDTO, @Res() response) {
    await this.authService.buildUserResponse(
      await this.userService.register(user),
    );
    await this.authenticate(
      { username: user.email, password: user.password },
      response,
    );
  }

  @ApiBearerAuth()
  @Get('me')
  @ApiOperation({ description: 'Returns current authenticated user' })
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  async me(@Req() req) {
    return req.user;
  }

  @Post('refresh')
  async refreshToken(@Body() refresh: RefreshTokenDTO) {
    const { refreshToken } = refresh;
    return { access: await this.authService.refreshToken(refreshToken) };
  }
}
