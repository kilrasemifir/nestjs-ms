import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Utilisateur } from './utilisateurs/entities/utilisateur.entity';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';

@Module({
  imports: [
    UtilisateursModule, 
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "root",
      database: "utilisateurs",
      synchronize: true,
      entities: [Utilisateur]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
