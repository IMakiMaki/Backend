import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { TransformInterceptor } from './transform.interceptor';
import { ExcludeNullInterceptor } from './exclude-null.interceptor';
import { TimeoutInterceptor } from './time-out.interceptor';
import { CacheInterceptor } from './cache.interceptor';

export const Interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ExcludeNullInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TimeoutInterceptor,
  },
];
