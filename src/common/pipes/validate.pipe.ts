import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform<unknown, unknown> {
  transform(value: unknown, metadata: ArgumentMetadata): unknown {
    return value;
  }
}
