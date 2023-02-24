import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STOCK_PUBLISHER',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'stock1',
            brokers: ['localhost:9092'],
          },      
        }
      }
    ])
  ],
  controllers: [StockController],
  providers: [StockService]
})
export class StockModule {}
