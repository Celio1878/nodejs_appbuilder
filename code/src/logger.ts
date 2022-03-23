import pino from 'pino';

/**
 * Criar logger performatico para substituir console.log()
 */
export const logger = pino({
	enabled: !!!process.env.LOG_DISABLED,
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
		},
	},
});
