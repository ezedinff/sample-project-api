import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { isEmpty } from 'lodash';
import PasswordService from './password.service';
import { User } from './user';
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
class AddFriendDTO {
  userId: string;
}
@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
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
  async findAll() {
    return (await this.userService.findAll({})).map((user) => {
      const { password, ...rest } = user.toObject();
      return rest;
    });
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
    const password = this.passwordService.hashPassword(update.password);
    const user = await this.userService.update(req.user._id, {
      ...update,
      password,
    });
    delete user.password;
    return user;
  }

  @Post('add-friend')
  @UseGuards(AuthGuard('jwt'))
  async addFriend(@Req() req, @Body() addFriend: AddFriendDTO) {
    const currentUser = await this.userService.findById(req.user._id);
    if (
      currentUser.friends.includes(addFriend.userId) &&
      currentUser._id.toString() != addFriend.userId
    ) {
      currentUser.friends.push(addFriend.userId);
      currentUser.save();
    }
    return currentUser;
  }
}
