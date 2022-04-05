import { Response } from "express";
import { logger } from "../logger";

type ApiResponse = string | object;

export const reply_success = reply_with_status(200);
export const reply_created = reply_with_status(201);
export const reply_unauthorized = reply_with_status(401);
export const reply_wrong_params = reply_with_status(400);
export const reply_not_found = reply_with_status(404);
export const reply_error = (res: Response, error: any) => {
  const stack = error?.stack;
  const error_log_text = stack || String(error);

  if (process.env.STAGE !== "test") {
    logger.error(error_log_text);
  }

  return res.status(500).json({ Error: error });
};

function reply_with_status(status: number) {
  return (res: Response, response: ApiResponse) =>
    res.status(status).json(response);
}
