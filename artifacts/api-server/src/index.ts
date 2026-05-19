import app from "./app";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"] || "5000";

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// ─── Graceful Shutdown ──────────────────────────────────────
let isShuttingDown = false;

function gracefulShutdown(signal: string) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  logger.info({ signal }, "Received shutdown signal, starting graceful shutdown...");

  // Stop accepting new connections
  server.close((err) => {
    if (err) {
      logger.error({ err }, "Error during server close");
      process.exit(1);
    }
    logger.info("Server closed, all connections drained");
    process.exit(0);
  });

  // Force exit after 30 seconds if graceful shutdown fails
  setTimeout(() => {
    logger.error("Forced shutdown — graceful shutdown timed out");
    process.exit(1);
  }, 30000);
}

// ─── Start Server ───────────────────────────────────────────
// Express 5: app.listen callback does NOT receive an error parameter
const server = app.listen(port, () => {
  logger.info({
    port,
    environment: process.env.NODE_ENV || "development",
    version: process.env.APP_VERSION || "0.0.0",
    nodeVersion: process.version,
    pid: process.pid,
  }, "🚀 Threadit API server listening");
});

server.on("error", (err: Error) => {
  logger.error({ err }, "Error starting server");
  process.exit(1);
});

// Keep-alive timeout (for reverse proxy compatibility)
server.keepAliveTimeout = 65000; // Slightly higher than ALB default of 60s
server.headersTimeout = 66000;

// ─── Shutdown Signals ───────────────────────────────────────
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// ─── Unhandled Error Handlers ───────────────────────────────
process.on("uncaughtException", (error) => {
  logger.fatal({ err: error }, "Uncaught exception — shutting down");
  gracefulShutdown("uncaughtException");
});

process.on("unhandledRejection", (reason) => {
  logger.error({ err: reason }, "Unhandled promise rejection");
  // Don't crash on unhandled rejections, but log them
});
