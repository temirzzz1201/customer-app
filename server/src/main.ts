import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { mainClientUrl } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableCors({
    origin: mainClientUrl,
    credentials: true, // если cookies или авторизация
  });

  const config = new DocumentBuilder()
    .setTitle('Articles API')
    .setDescription('CRUD статьи с авторизацией')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useStaticAssets('/var/www/uploads', {
    prefix: '/uploads/',
  });

  const sequalize = app.get(Sequelize);
  await sequalize.sync({ alter: false });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
