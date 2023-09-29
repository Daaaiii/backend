import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UserModule } from './user/user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  const config = new DocumentBuilder()
    .setTitle('AquiDev')
    .setDescription('API de bebidas')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
