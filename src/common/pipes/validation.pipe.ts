import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  Type,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe<T> implements PipeTransform<T, Promise<T>> {
  async transform(value: T, { metatype }: ArgumentMetadata): Promise<T> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return value;
  }

  private toValidate(metatype: Type<unknown>): boolean {
    const types: Array<Type<unknown>> = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
