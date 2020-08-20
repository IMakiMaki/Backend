import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Cat } from './interface/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Omit<Cat, 'id'>): Promise<Cat> {
    const newCat = { ...cat, id: Math.max(0, ...this.cats.map((it) => it.id)) + 1 };
    this.cats.push(newCat);
    return Promise.resolve(newCat);
  }

  async findOne(id: number): Promise<Cat | undefined> {
    return this.cats.find((el) => el.id === id);
  }

  findAll(limit: number): Promise<Cat[]> {
    return new Promise<Cat[]>((resolve) => resolve(this.cats.slice(0, limit)));
  }

  update(id: number, cat: Omit<Cat, 'id'>): Promise<Cat> {
    return new Promise((resolve) => {
      const findCatIndex = this.cats.findIndex((it) => it.id === id);
      if (findCatIndex === -1) {
        throw new HttpException({ error: 'id不存在' }, HttpStatus.BAD_REQUEST);
      } else {
        const upDateItem = { ...cat, id };
        this.cats.splice(findCatIndex, 1, upDateItem);
        resolve(upDateItem);
      }
    });
  }
}
