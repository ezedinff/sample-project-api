import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { isEmpty } from 'lodash';
import PasswordService from './password.service';
import { Role, User } from './user';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { cookieNames } from '../auth/constants';
import { Roles } from 'src/shared/decorators/role';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
@UseGuards(RolesGuard, AuthGuard('jwt'))
export class UserController {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
  ) {}
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    delete user.password;
    return user;
  }
  @Get()
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async findAll(): Promise<User[]> {
    let users = await this.userService.findAll({});
    users = users.map((user) => {
      delete user.password;
      return user;
    });
    return users;
  }
  //
  @Patch()
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async update(@Req() req, @Body() update: Partial<UserDTO>) {
    if (isEmpty(update.password)) {
      const user = await this.userService.update(req.user._id, update);
      delete user.password;
      return user;
    }
    let password = this.passwordService.hashPassword(update.password);
    const user = await this.userService.update(req.user._id, {
      ...update,
      password,
    });
    delete user.password;
    return user;
  }
}
