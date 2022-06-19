import { Response } from "express";

type ApiResponse = string | object;

/**
 * Reply with a 200 status code and the given response.
 */
export const reply_success = reply_with_status(200);

/**
 * Reply with a 201 status code (created) and the given response.
 */
export const reply_created = reply_with_status(201);

/**
 * Reply with a 401 status code (unauthorized) and the given response.
 */
export const reply_unauthorized = reply_with_status(401);

/**
 * Reply with a 400 status code (bad request) and the given response.
 */
export const reply_wrong_params = reply_with_status(400);

/**
 * Reply with a 404 status code (not found) and the given response.
 */
export const reply_not_found = reply_with_status(404);

/**
 * Reply with a 500 status code (internal server error) and the given response.
 */
export const reply_error = reply_with_status(500);

function reply_with_status(status: number) {
   return (res: Response, response: ApiResponse) => {
      res.status(status).json(response);
   };
}
