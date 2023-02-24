import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices/client';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockService {

  constructor(
    @Inject('STOCK_PUBLISHER') private readonly client: ClientKafka
  ){}

  async onModuleInit() {
    this.client.subscribeToResponseOf('stocks');
    this.client.connect();
  }

  create(createStockDto: CreateStockDto) {
    console.log(createStockDto)
    this.client.send('stocks', {
      key: 1,
      value: JSON.stringify(createStockDto)
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
