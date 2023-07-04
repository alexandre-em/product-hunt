import { Injectable } from '@angular/core';
import { LogLevel } from 'src/app/models/logLevel.model';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private logLevel = new LogLevel();

  info(message: string): void {
    const formattedMsg = { message, level: 'info', timestamp: new Date().toISOString() };
    this.logWith(this.logLevel.Info, JSON.stringify(formattedMsg));
  }

  warn(message: string): void {
    const formattedMsg = { message, level: 'warn', timestamp: new Date().toISOString() };
    this.logWith(this.logLevel.Warn, JSON.stringify(formattedMsg));
  }

  error(message: string): void {
    const formattedMsg = { message, level: 'error', timestamp: new Date().toISOString() };
    this.logWith(this.logLevel.Error, JSON.stringify(formattedMsg));
  }

  private logWith(level: number, msg: string): void {
    if (level <= this.logLevel.Error) {
      switch (level) {
        case this.logLevel.None:
          return console.log(msg);
        case this.logLevel.Info:
          return console.info('%c' + msg, 'color: #6495ED');
        case this.logLevel.Warn:
          return console.warn('%c' + msg, 'color: #FF8C00');
        case this.logLevel.Error:
          return console.error('%c' + msg, 'color: #DC143C');
        default:
          console.debug(msg);
      }
    }
  }
}
