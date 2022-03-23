export type Result<T> = [error?: any, result?: T];

export function success<T>(r: T): Result<T> {
  return [null, r];
}

export function failed(err: string): Result<any> {
  return [err, null];
}

export function has_succeded(r: Result<any>) {
  return !r[0] && !!r[1];
}

export function has_failed(r: Result<any>) {
  return !has_succeded(r);
}
