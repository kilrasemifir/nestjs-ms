import { Module } from '@nestjs/common';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STOCK_CONSUMER',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'stock1',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'stock-handler'
          }    
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
