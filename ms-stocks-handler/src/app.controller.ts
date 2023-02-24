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
    if (data.demmande === 'create') {
      return this.appService.create(data.data);
    } else if (data.demmande === 'update') {
      return this.appService.update(data.key, data.data);
    } else if (data.demmande === 'delete') {
      return this.appService.delete(data.data.id);
    }

    
  }

}
