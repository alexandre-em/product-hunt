// Logger transport type
interface TransportType {
  type: string;
  options: winston.transports.ConsoleTransportOptions | WinstonRotate.DailyRotateFileTransportOptions;
}
