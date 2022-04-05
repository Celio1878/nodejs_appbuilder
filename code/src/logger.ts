import pino from "pino";

/**
 * Utilizado para logs da aplicação.
 */
export const logger = pino({
	
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});
