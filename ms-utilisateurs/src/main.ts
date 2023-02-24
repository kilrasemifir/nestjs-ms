import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfiguration = new DocumentBuilder()
      .setTitle("utilisateurs")
      .setDescription("Microservice pour la gestion des utilisateurs")
      .setVersion("1.0.0")
      .build();
  
  const document = SwaggerModule.createDocument(app, swaggerConfiguration);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
