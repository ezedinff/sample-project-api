import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { cookieNames } from './modules/auth/constants';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  const options = new DocumentBuilder()
    .setTitle('ZAD BAKERY FINANCE MANAGEMENT')
    .setDescription('ZAD BAKERY FINANCE MANAGEMENT API')
    .setVersion('1.0')
    .addCookieAuth(cookieNames.ACCESS_TOKEN)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
