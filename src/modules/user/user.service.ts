import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "src/shared/base.service";
import PasswordService from "./password.service";
import { User } from "./user";
import { UserDTO } from "./user.dto";

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectModel(User.name) userModel: Model<User>,
        private passwordService: PasswordService
    ) {
        super();
        this._model = userModel;
    }
    async register(user: UserDTO) {
        const password = this.passwordService.hashPassword(user.password);
        const newUser = await this.create({ ...user, password });
        delete newUser.password;
        return newUser;
    }
}