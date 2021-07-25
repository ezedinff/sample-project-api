import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import PasswordService from "./password.service";
import { User, UserSchema } from "./user";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    controllers: [UserController],
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ])
    ],
    providers: [
        UserService,
        PasswordService
    ],
    exports: [
        UserService,
        PasswordService
    ]
})
export class UserModule { }