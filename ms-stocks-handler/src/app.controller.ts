import { Controller, Get, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices/client';
import { MessagePattern, Payload } from '@nestjs/microservices/decorators';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('STOCK_CONSUMER')
    private readonly client: ClientKafka,
    private readonly appService: AppService
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('stocks');
    this.client.connect();
  }

  @MessagePattern('stocks')
  async getStocks(@Payload() data: any) {
    console.log("data", data, typeof(data));
  }

}
