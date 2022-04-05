import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import { NextFunction, Request, Response } from "express";
import {
  AppBuilderReturnType,
  BuildArgs,
  ErrorMiddleware,
  Middleware,
  Module,
} from "./utils/ApiTypes";
import { reply_error } from "./utils/replys";

/**
 * Cria Api.
 * @param modules
 * Deve adicionar os modulos na ordem que devem ser executados.
 * @returns
 */
export function AppBuilder(modules: Module[] = []): AppBuilderReturnType {
  const add_module = (module: Module) => AppBuilder(modules.concat(module));

  return {
    add_module,
    build(args: Partial<BuildArgs>) {
      const app = express();
      app.disable("x-powered-by");
      const default_props = default_args(args);

      const config_middlewares = [
        express.json({ limit: "900kb" }),
        compression(),
        cors(default_props.cors),
      ];

      config_middlewares.forEach((config_middleware) =>
        app.use("*", config_middleware)
      );

      // adiciona middlewares ao topo da cadeia.
      modules
        .flatMap((module) => module.to_add_to_start_of_middleware_chain)
        .filter((middleware) => !!middleware)

        .forEach((middleware) => app.use("*", middleware as Middleware));

      // adiciona endpoints.
      const modules_map = modules.reduce(
        (map, module) => map.set(module.name, module),
        new Map<string, Module>()
      );

      modules.forEach((module) =>
        add_module_endpoints_to_app(
          app,
          module,
          modules_map,
          default_props.base_url
        )
      );

      app.use(default_props.error_handler as ErrorMiddleware);

      return app;
    },
  };
}

/**
 * Standart Args for create a API
 *
 * @param args
 * @returns
 */
function default_args(args: Partial<BuildArgs>): BuildArgs {
  const DEFAULT_CONFIG: BuildArgs = {
    base_url: "/",
    cors: {
      origin: "*",
      methods: "OPTIONS, GET, POST, PATCH, PUT, DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
      ...(args?.cors || {}),
    },

    error_handler: (error: any, _req: Request, res: Response) =>
      reply_error(res, error),
  };

  const final_args: BuildArgs = {
    ...DEFAULT_CONFIG,
    ...(args || {}),
    cors: {
      ...DEFAULT_CONFIG.cors,
      ...(args?.cors || {}),
    },

    error_handler: args?.error_handler || DEFAULT_CONFIG.error_handler,
  };

  return final_args;
}

/**
 * Add routes
 *
 * @param app
 * @param module
 * @param modules_map
 * @param base_url
 * @returns
 */
function add_module_endpoints_to_app(
  app: ReturnType<typeof express>,
  module: Module,
  modules_map: Map<string, Module>,
  base_url: string = ""
) {
  (module.endpoints || []).forEach(({ method, endpoint, middlewares }) => {
    const base_url_sanitized = remove_trim_slashes(base_url);
    const module_base_url_sanitized = remove_trim_slashes(
      module.base_url || ""
    );
    const endpoint_sanitized = remove_trim_slashes(endpoint);

    const final_endpoint =
      "/" +
      remove_trim_slashes(
        `${base_url_sanitized}/${module_base_url_sanitized}/${endpoint_sanitized}`
          .replace(/\/\//g, "/")
          .replace(/\/\//g, "/")
          .replace(/\/\//g, "/")
      );

    const args = [final_endpoint, middlewares.map(with_error_handling)];

    app[method.toLowerCase()].apply(app, args);
  });

  module.children?.forEach((child_module) =>
    add_module_endpoints_to_app(
      app,
      child_module,
      modules_map,
      `${base_url}/${module.base_url}`
    )
  );

  return app;
}

function with_error_handling(middleware: any): Middleware {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const middleware_result = middleware(req, res, next);

      if (!!middleware_result && middleware_result.catch) {
        middleware_result.catch(next);
      }
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Remove '/' do comeco e do fim de uma string.
 *
 * @param str
 * @returns
 */
function remove_trim_slashes(str: string) {
  let result = str.trim();

  if (str === "/") {
    return "";
  }

  if (result[0] === "/") {
    result = result.substring(1, result.length);
  }

  if (result[result.length - 1] === "/") {
    result = result.substring(0, result.length - 1);
  }

  return result;
}
