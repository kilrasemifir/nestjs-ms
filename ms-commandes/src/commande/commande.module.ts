import { Module } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { Commande } from './entities/commande.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Commande]),
    HttpModule
  ],
  controllers: [CommandeController],
  providers: [CommandeService]
})
export class CommandeModule {}
