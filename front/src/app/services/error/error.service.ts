import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  public hasError = false;
  public error: Error | null = null;

  constructor(private readonly loggerService: LoggerService) {}

  resetError() {
    this.loggerService.info('Resetting error state');
    this.hasError = false;
    this.error = null;
  }

  handleError(error: Error | HttpErrorResponse) {
    this.loggerService.error('Catching an error: ' + error.message);
    this.hasError = true;

    if (error.name === HttpErrorResponse.name) {
      const httpErr = error as HttpErrorResponse;
      this.error = new Error(httpErr.statusText);
    } else {
      this.error = error;
    }
  }
}
