import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/mongoose-config.service';
@Module({
  imports: [
    MongooseModule.forRootAsync({ useClass: MongooseConfigService, imports: [ConfigModule] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
