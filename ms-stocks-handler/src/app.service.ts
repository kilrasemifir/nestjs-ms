import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { Stock } from './stock.entity';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(Stock)
    private repository: Repository<Stock>
  ){}
  create(data: any) {
    return this.repository.save(data);
  }

  update(id: number, data: any) {
    return this.repository.update(id, data);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
