import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  transform(value: unknown, metadata: ArgumentMetadata): unknown {
    const { error } = this.schema.validate(value, { convert: false });
    if (error) {
      console.error(error);
      throw new BadRequestException(error.details.reduce((prev, curr) => prev + curr.message, ''));
    }
    return value;
  }
}
