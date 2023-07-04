import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  public hasError = false;
  public error: Error | null = null;

  resetError() {
    this.hasError = false;
    this.error = null;
  }

  handleError(error: Error | HttpErrorResponse) {
    this.hasError = true;

    if (error.name === HttpErrorResponse.name) {
      const httpErr = error as HttpErrorResponse;
      this.error = new Error(httpErr.statusText);
    } else {
      this.error = error;
    }
  }
}
