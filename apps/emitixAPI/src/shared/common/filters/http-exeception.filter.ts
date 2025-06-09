import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorDetails = typeof exceptionResponse === 'string'
      ? { message: exceptionResponse, statusCode: status, timestamp: new Date().toISOString(), path: request.url }
      : (exceptionResponse as object);

    response
      .status(status)
      .json({
        ...errorDetails,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
