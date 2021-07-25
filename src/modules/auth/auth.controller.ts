import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/shared/decorators/user";
import { UserDTO } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { cookieNames } from "./constants";
import { Credentials } from "./credentials";
import { AuthService } from "./services/auth.service";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService) { }

    @Post('login')
    @ApiOperation({ description: 'authenticate user using username and password' })
    @ApiOkResponse({})
    async authenticate(@Body() credentials: Credentials, @Res() response) {
        await this.authService.login(credentials, response);
    }

    @Post('register')
    @ApiOperation({ description: 'Register new user' })
    @ApiCreatedResponse({})
    async register(@Body() user: UserDTO) {
        return await this.userService.register(user);
    }

    @Get('me')
    @ApiCookieAuth(cookieNames.ACCESS_TOKEN)
    @ApiOperation({description: 'Returns current authenticated user'})
    @ApiOkResponse({})
    @UseGuards(AuthGuard('jwt'))
    async me(@CurrentUser() user) {
        return user;
    }
}