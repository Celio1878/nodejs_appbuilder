import pino from "pino";

/**
 * Logger class
 */
export const logger = pino({
   transport: {
      target: "pino-pretty",
      options: {
         colorize: true,
      },
   },
});
