import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Stock } from './entities/stock.entity';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STOCK_PUBLISHER',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'stock1',
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
          },      
        }
      }
    ]),
    TypeOrmModule.forFeature([Stock]),
  ],
  controllers: [StockController],
  providers: [StockService]
})
export class StockModule {}
