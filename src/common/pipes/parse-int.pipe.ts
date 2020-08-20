import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<unknown, number> {
  transform(value: unknown, metadata: ArgumentMetadata): number {
    const val = parseInt(String(value), 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed: '${value}' can not be transformed to number`
      );
    }
    return val;
  }
}
