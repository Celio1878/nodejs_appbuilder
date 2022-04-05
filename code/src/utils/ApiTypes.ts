import { CorsOptions } from "cors";
import * as express from "express";
import { NextFunction, Request, Response } from "express";

/**
 * Representa um modulo do servico.
 */
export type Module = {
  name: string;
  base_url?: string;
  endpoints?: EndpointDefinition[];
  children?: Module[];
  to_add_to_start_of_middleware_chain?: (Middleware | AsyncMiddleware)[];
  public_services?: any;
};

type EndpointDefinition = {
  method: Method;
  endpoint: string;
  middlewares: (Middleware | AsyncMiddleware | ErrorMiddleware)[];
};

export type ErrorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => any;

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => any;

export type AsyncMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export type Method = "USE" | "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export type BuildArgs = {
  base_url?: string;
  cors?: CorsOptions;
  error_handler?: ErrorMiddleware;
};

export type AppBuilderReturnType = {
  add_module: (module: Module) => AppBuilderReturnType;
  build: (args?: BuildArgs, app?: ExpressApp) => ExpressApp;
};

export type ExpressApp = ReturnType<typeof express>;
