import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { APP_FILTER, APP_PIPE, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/any-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { RolesGuard } from './common/guards/roles.guard';
import { Interceptors } from './common/interceptors';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
    CatsModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // 在全局注册http异常过滤器
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    ...Interceptors,
  ],
})
export class AppModule implements NestModule {
  configure(_consumer: MiddlewareConsumer): void {
    // 将中间件加入/cats路由的请求中
    // consumer.apply(LoggerMiddleware).forRoutes({
    //   path: 'cats',
    //   method: RequestMethod.ALL, // 限定中间件的请求方法
    // });
    // 同时可以接收一个控制器类 但此时404 not found的情况下的请求不会经过中间件
    // consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
