export type Result<T> = [error?: any, result?: T];

/**
 * Return a success
 * @param result
 * @returns
 */
export function success<T>(result: T): Result<T> {
   return [null, result];
}

/**
 * Return a error
 * @param err
 * @returns
 */
export function failed(err: string): Result<any> {
   return [err, null];
}

export function has_succeded(result: Result<any>) {
   return !result[0] && !!result[1];
}

export function has_failed(result: Result<any>) {
   return !has_succeded(result);
}
