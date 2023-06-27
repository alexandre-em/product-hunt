import winston, { format } from 'winston';
import WinstonRotate from 'winston-daily-rotate-file';

function createConsoleTransport(options: winston.transports.ConsoleTransportOptions | undefined) {
  return new winston.transports.Console(options);
}

function createFileRotateTransport(options: WinstonRotate.DailyRotateFileTransportOptions | undefined) {
  return new WinstonRotate(options);
}

// we pass this function an array of transport objects
// each transport object has 2 properties: type & options
function getLoggerTransports(transports: Array<TransportType>) {
  return transports.map((transport) => {
    const { type, options } = transport;

    // Possibility to add logger cases like slack, elasticsearch, etc.
    switch (type) {
      case 'file-rotate':
        return createFileRotateTransport(options);
      default:
        return createConsoleTransport(options);
    }
  });
}

export default function create(transports: Array<TransportType>) {
  return winston.createLogger({
    format: format.combine(
      format.timestamp({
        format: 'HH:mm:ss-DD/MM/YYYY',
      }),
      format.json()
    ),
    transports: getLoggerTransports(transports),
  });
}
