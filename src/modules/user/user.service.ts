import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "src/shared/base.service";
import { User } from "./user";

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectModel(User.name) userModel: Model<User>
    ) {
        super();
        this._model = userModel;
    }
}