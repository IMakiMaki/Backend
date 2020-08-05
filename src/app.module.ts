import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/any-exception.filter';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // 在全局注册http异常过滤器
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // 将中间件加入/cats路由的请求中
    // consumer.apply(LoggerMiddleware).forRoutes({
    //   path: 'cats',
    //   method: RequestMethod.ALL, // 限定中间件的请求方法
    // });

    // 同时可以接收一个控制器类 但此时404 not found的情况下的请求不会经过中间件
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
