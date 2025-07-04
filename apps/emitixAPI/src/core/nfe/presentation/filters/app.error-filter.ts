import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common'
import { Response } from 'express'
import { AppError } from 'src/shared/errors/app.error'

@Catch(AppError)
export class AppErrorFilter implements ExceptionFilter {
  catch(exception: AppError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response.status(exception.statusCode).json({
      error: exception.name,
      message: exception.message,
      details: exception.details ?? null,
    })
  }
}
