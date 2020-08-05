import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Injectable()
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status: number;
    let message: string | Record<string, any>;
    if (exception instanceof HttpException) {
      (message = exception.getResponse()), (status = exception.getStatus());
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'error';
    }

    console.error('AllExceptionsFilter', status);
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      errorResponse: message,
    });
  }
}
