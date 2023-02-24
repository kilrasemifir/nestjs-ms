import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices/client';
import { CreateStockDto } from './dto/create-stock.dto';
import { StockEvent } from './dto/stock.event';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StockService {

  constructor(
    @Inject('STOCK_PUBLISHER') private readonly client: ClientKafka
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
    }).subscribe(console.log);
  }

  findAll() {
    return `This action returns all stock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
