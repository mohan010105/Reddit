import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  // Redact sensitive fields from logs
  redact: [
    "req.headers.authorization",
    "req.headers.cookie",
    "res.headers['set-cookie']",
    "*.password",
    "*.secret",
    "*.token",
    "*.apiKey",
    "*.creditCard",
  ],
  // Add base context to all logs
  base: {
    service: "threadit-api",
    version: process.env.APP_VERSION || "0.0.0",
    environment: process.env.NODE_ENV || "development",
  },
  // Timestamp format
  timestamp: pino.stdTimeFunctions.isoTime,
  // Production: JSON for log aggregation; Dev: pretty-print
  ...(isProduction
    ? {
        // Structured JSON logging for Logtail/Datadog/etc.
        formatters: {
          level: (label: string) => ({ level: label }),
          bindings: (bindings: Record<string, unknown>) => ({
            pid: bindings.pid,
            hostname: bindings.hostname,
          }),
        },
      }
    : {
        transport: {
          target: "pino-pretty",
          options: { colorize: true, translateTime: "SYS:HH:MM:ss" },
        },
      }),
});

// ─── Structured Log Helpers ───────────────────────────────
export function logDatabaseQuery(query: string, duration: number, params?: unknown) {
  logger.debug(
    { query: query.slice(0, 200), duration, params: params ? "[redacted]" : undefined },
    "Database query executed",
  );
  if (duration > 1000) {
    logger.warn({ query: query.slice(0, 200), duration }, "Slow database query detected");
  }
}

export function logPaymentEvent(event: string, data: Record<string, unknown>) {
  logger.info({ payment: { event, ...data } }, `Payment: ${event}`);
}

export function logSecurityEvent(event: string, data: Record<string, unknown>) {
  logger.warn({ security: { event, ...data } }, `Security: ${event}`);
}

export function logRealtimeEvent(event: string, data: Record<string, unknown>) {
  logger.debug({ realtime: { event, ...data } }, `Realtime: ${event}`);
}
