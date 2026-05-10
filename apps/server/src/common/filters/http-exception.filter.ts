import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import type { ApiResponse } from '@kidsmath/shared';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let code = 'UNKNOWN_ERROR';
    let message = 'An error occurred';
    let details: Record<string, any> | undefined;

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null
    ) {
      const res = exceptionResponse as Record<string, any>;
      let msg = res.message || message;
      if (Array.isArray(msg)) {
        msg = msg.join(', ');
      }
      message = msg;
      code = res.error?.toUpperCase()?.replace(/\s+/g, '_') || code;
      details = res.details;
    }

    this.logger.error(
      `${request.method} ${request.url} ${status} - ${message}`,
    );

    const body: ApiResponse<null> = {
      success: false,
      data: null,
      error: {
        code,
        message,
        details,
      },
    };

    response.status(status).json(body);
  }
}
