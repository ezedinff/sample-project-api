import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/mongoose-config.service';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './shared/guards/role.guard';
import { PostModule } from './modules/post/post.module';
import { ChatModule } from './modules/chat/chat.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      imports: [ConfigModule],
    }),
    AuthModule,
    PostModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
