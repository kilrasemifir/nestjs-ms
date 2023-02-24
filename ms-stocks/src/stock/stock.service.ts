import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices/client';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { CreateStockDto } from './dto/create-stock.dto';
import { StockEvent } from './dto/stock.event';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StockService {

  constructor(
    @Inject('STOCK_PUBLISHER') 
    private readonly client: ClientKafka,
    @InjectRepository(Stock)
    private readonly repository: Repository<Stock>
  ){}

  async onModuleInit() {
    this.client.subscribeToResponseOf('stocks');
    this.client.connect();
  }

  create(dto: Stock) {
    const event: StockEvent = {
      timestamp: new Date(),
      userId: 1,
      data: dto,
      demmande: "create"
    }
    this.client.send('stocks', {
      key: dto.produitId,
      value: JSON.stringify(event)
    }).subscribe();
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({where: {id}});
  }

  update(id: number, dto: UpdateStockDto) {
    const event: StockEvent = {
      timestamp: new Date(),
      userId: 1,
      data: dto,
      demmande: "update"
    }
    this.client.send('stocks', {
      key: id,
      value: JSON.stringify(event)
    }).subscribe();
  }

  remove(id: number) {
    const event: StockEvent = {
      timestamp: new Date(),
      userId: 1,
      data: {id},
      demmande: "delete"
    }
    this.client.send('stocks', {
      key: id,
      value: JSON.stringify(event)
    }).subscribe();
  }
}
