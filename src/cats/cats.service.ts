import { Injectable } from '@nestjs/common';
import { Cat } from './interface/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat): Promise<Cat> {
    this.cats.push(cat);
    return Promise.resolve(cat);
  }

  findAll(): Promise<Cat[]> {
    return new Promise<Cat[]>((resolve) =>
      resolve(this.cats.concat({ name: 'string', age: 12, breed: '21' }))
    );
  }
}
