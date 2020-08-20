import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isCached = this.reflector.get<boolean>('isCached', context.getHandler());
    if (isCached) {
      return of([]).pipe(
        tap(() => {
          console.log('get data from cache');
        })
      );
    }
    return next.handle();
  }
}
