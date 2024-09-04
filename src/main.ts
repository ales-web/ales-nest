import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: fs.readFileSync('/etc/letsencrypt/live/api.krylshop.ru/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/api.krylshop.ru/cert.pem'),
    },
  });

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Ales-Nest')
    .setDescription('Ales nest-based api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
