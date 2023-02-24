import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './stock/entities/stock.entity';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    StockModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "root",
      entities: [Stock],
      synchronize: true,
      database: "stocks",
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
