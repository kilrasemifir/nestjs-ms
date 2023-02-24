import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'stock-handler',
          brokers: ['localhost:9092'],
        }
      }
    }
    );
  await app.listen();
}
bootstrap();
