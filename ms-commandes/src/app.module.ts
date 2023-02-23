import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommandeModule } from './commande/commande.module';
import { Commande } from './commande/entities/commande.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "root",
      database: "commandes",
      synchronize: true,
      entities: [
        Commande
      ]
    }),
    CommandeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
