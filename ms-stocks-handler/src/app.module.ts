import { Module } from '@nestjs/common';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Stock } from './stock.entity';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STOCK_CONSUMER',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'stock1',
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
          },
          consumer: {
            groupId: 'stock-handler'
          }    
        }
      }
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "root",
      entities: [Stock],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Stock]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
