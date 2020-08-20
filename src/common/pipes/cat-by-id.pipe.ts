import { PipeTransform, ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { Cat } from 'src/cats/interface/cat.interface';

@Injectable()
export class CatByIdPipe implements PipeTransform<unknown, Promise<Cat>> {
  constructor(private readonly catService: CatsService) {}

  async transform(value: unknown, metadata: ArgumentMetadata): Promise<Cat> {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new BadRequestException(
        `Validation failed: '${value}' can not be transformed to number`
      );
    } else {
      const cat = await this.catService.findOne(value);
      if (!cat) {
        throw new BadRequestException(`Validation failed: can not find the id='${value}' cat`);
      }
      return cat;
    }
  }
}
