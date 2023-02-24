import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  create(data: any) {
    console.log("creation du stock",data);
    return data;
  }
}
