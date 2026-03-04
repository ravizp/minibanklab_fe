type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
}

function createLogEntry(level: LogLevel, message: string, data?: unknown): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    data,
  };
}

export const logger = {
  info(message: string, data?: unknown) {
    const entry = createLogEntry('info', message, data);
    console.log(`[${entry.timestamp}] INFO: ${message}`, data ?? '');
  },

  warn(message: string, data?: unknown) {
    const entry = createLogEntry('warn', message, data);
    console.warn(`[${entry.timestamp}] WARN: ${message}`, data ?? '');
  },

  error(message: string, data?: unknown) {
    const entry = createLogEntry('error', message, data);
    console.error(`[${entry.timestamp}] ERROR: ${message}`, data ?? '');
  },

  debug(message: string, data?: unknown) {
    if (process.env.NODE_ENV === 'development') {
      const entry = createLogEntry('debug', message, data);
      console.debug(`[${entry.timestamp}] DEBUG: ${message}`, data ?? '');
    }
  },

  request(method: string, url: string, status?: number, duration?: number) {
    const data = { method, url, status, duration_ms: duration };
    if (status && status >= 400) {
      this.error(`HTTP ${method} ${url} → ${status}`, data);
    } else {
      this.info(`HTTP ${method} ${url} → ${status}`, data);
    }
  },
};
