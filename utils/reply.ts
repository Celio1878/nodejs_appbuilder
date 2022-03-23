import { Response } from "express";
import { logger } from "../logger";

export const reply_error = (res: Response, error: any) => {
	const stack = error?.stack;
	const error_log_text = stack || String(error);

	if (process.env.STAGE !== "test") {
		logger.error(error_log_text);
	}

	return res.status(500).json({ Error: error });
};
