import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { cookieNames } from './modules/auth/constants';
import * as cookieParser from 'cookie-parser';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
async function bootstrap() {
  console.log(`${process.env.JWT_ACCESS_TOKEN_SECRET}`);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());
  const options = new DocumentBuilder()
    .setTitle('Social Media App')
    .setDescription('Social Media app made for demo purpose')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 9000);
}
bootstrap();
