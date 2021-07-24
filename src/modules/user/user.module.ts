import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import PasswordService from "./password.service";
import { User, UserSchema } from "./user";
import { UserService } from "./user.service";

@Module({
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