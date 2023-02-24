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
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'stock-handler'
          }    
        }
      }
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'stocks',
      username: 'root',
      password: 'root',
      entities: [Stock],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Stock]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
