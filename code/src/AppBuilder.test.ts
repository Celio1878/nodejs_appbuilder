import { NextFunction, Request, Response } from "express";
import * as request from "supertest";
import { AppBuilder } from "./AppBuilder";
import { Method, Module } from "./utils/ApiTypes";
import { reply_success } from "./utils/replys";
import { sleep } from "./utils/sleep";

describe("AppBuilder", () => {
  const methods: Method[] = ["GET", "POST", "PUT", "DELETE", "PATCH"];

  methods.forEach((method) => {
    // Arrange
    const module: Module = {
      name: "test",
      base_url: "/test",
      endpoints: [
        {
          method,
          endpoint: "/",
          middlewares: [
            (_req: Request, res: Response) => {
              reply_success(res, { method });
            },
          ],
        },
      ],
    };

    test(`${method}: Should to set BASE_URL to the API.`, (done) => {
      // Arrange
      const base_url = "/api";
      const app = AppBuilder().add_module(module).build({ base_url });

      // Act
      request(app)
        [method.toLowerCase()](base_url + "/test")
        .end((_err: any, res: { status: number; body: { method: string } }) => {
          // Assert
          expect(res.status).toBe(200);
          expect(res.body.method).toBe(method);
          done();
        });
    });

    test(`${method}: Should to add route.`, (done) => {
      const app = AppBuilder().add_module(module).build();

      // Act
      request(app)
        [method.toLowerCase()]("/test")
        .end((_err: any, res: { status: number; body: { method: string } }) => {
          //  Assert
          expect(res.status).toBe(200);
          expect(res.body.method).toBe(method);
          done();
        });
    });

    test(`${method}: Should to fix slashes to mount the endpoints.`, (done) => {
      //ex: //test deve ser /test
      const app = AppBuilder()
        .add_module({
          name: "test",
          base_url: "/subpath",
          endpoints: [
            {
              method,
              endpoint: "/test",
              middlewares: [
                (_req: Request, res: Response) => {
                  reply_success(res, { method });
                },
              ],
            },
          ],
        })
        .build({
          base_url: "/",
        });

      // Act
      request(app)
        [method.toLowerCase()]("/subpath/test")
        .end((_err: any, res: { status: number; body: { method: string } }) => {
          //  Assert
          expect(res.status).toBe(200);
          expect(res.body.method).toBe(method);
          done();
        });
    });
  });

  test("Should to add multiple enpoints to APP.", (done) => {
    // Arrange
    const module: Module = {
      name: "test",
      base_url: "/test",
      endpoints: [
        {
          method: "GET",
          endpoint: "/1",
          middlewares: [
            (_req: Request, res: Response) => {
              reply_success(res, { num: 1 });
            },
          ],
        },
        {
          method: "GET",
          endpoint: "/2",
          middlewares: [
            (_req: Request, res: Response) => {
              reply_success(res, { num: 2 });
            },
          ],
        },
      ],
    };
    const app = AppBuilder().add_module(module).build();

    // Act
    request(app)
      .get("/test/1")
      .end((_err: any, res: { status: number; body: { num: number } }) => {
        //  Assert
        expect(res.status).toBe(200);
        expect(res.body.num).toBe(1);

        request(app)
          .get("/test/2")
          .end((_err: any, res: { status: number; body: { num: number } }) => {
            expect(res.status).toBe(200);
            expect(res.body.num).toBe(2);

            done();
          });
      });
  });

  test("Should to add a middleware chain.", (done) => {
    // Arrange
    const module: Module = {
      name: "test",
      base_url: "/test",
      endpoints: [
        {
          method: "GET",
          endpoint: "/1",
          middlewares: [
            (_req: Request, res: Response, next: NextFunction) => {
              res.locals.num = 1;
              next();
            },
            (_req: Request, res: Response) => {
              reply_success(res, { num: res.locals.num });
            },
          ],
        },
      ],
    };
    const app = AppBuilder().add_module(module).build();

    // Act
    request(app)
      .get("/test/1")
      .end((_err: any, res: { status: number; body: { num: number } }) => {
        //Assert
        expect(res.status).toBe(200);
        expect(res.body.num).toBe(1);

        done();
      });
  });

  test("Should to add children modules.", (done) => {
    // Arrange
    const book_id = 3000;
    const edition_id = 9000;
    const chapter_id = 12000;

    const module: Module = {
      name: "book",
      base_url: "/book",
      endpoints: [
        {
          method: "GET",
          endpoint: "/:id",
          middlewares: [
            (req: Request, res: Response) => {
              reply_success(res, { id: +req.params.id });
            },
          ],
        },
      ],
      children: [
        {
          name: "edition",
          base_url: ":book_id/edition/",
          endpoints: [
            {
              method: "GET",
              endpoint: "/:id",
              middlewares: [
                (req: Request, res: Response) => {
                  reply_success(res, {
                    book_id: +req.params.book_id,
                    id: +req.params.id,
                  });
                },
              ],
            },
          ],
          children: [
            {
              name: "chapter",
              base_url: ":edition_id/chapter",
              endpoints: [
                {
                  method: "GET",
                  endpoint: "/:id",
                  middlewares: [
                    (req: Request, res: Response) => {
                      reply_success(res, {
                        book_id: +req.params.book_id,
                        edition_id: +req.params.edition_id,
                        id: +req.params.id,
                      });
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    const app = AppBuilder().add_module(module).build();

    // Act
    request(app)
      .get(`/book/${book_id}`)
      .end((_err: any, res: { status: number; body: { id: string } }) => {
        // Assert
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(book_id);

        request(app)
          .get(`/book/${book_id}/edition/${edition_id}`)
          .end(
            (
              _err: any,
              res: { status: number; body: { book_id: string; id: string } }
            ) => {
              // Assert
              expect(res.status).toBe(200);
              expect(res.body.book_id).toBe(book_id);
              expect(res.body.id).toBe(edition_id);

              request(app)
                .get(
                  `/book/${book_id}/edition/${edition_id}/chapter/${chapter_id}`
                )
                .end(
                  (
                    _err: any,
                    res: {
                      status: number;
                      body: { book_id: string; id: string; edition_id: string };
                    }
                  ) => {
                    // Assert
                    expect(res.status).toBe(200);
                    expect(res.body.book_id).toBe(book_id);
                    expect(res.body.id).toBe(chapter_id);
                    expect(res.body.edition_id).toBe(edition_id);
                    done();
                  }
                );
            }
          );
      });
  });

  const asyncFun = async () => {
    await sleep();
    let x: any = {};
    x.y.z; // Generate a error.
  };

  test("Should pass errors to the configured error middleware if it throws an error inside a promise.", (done) => {
    // Arrange

    const module: Module = {
      name: "test",
      base_url: "/test",
      endpoints: [
        {
          method: "GET",
          endpoint: "/",
          middlewares: [
            async (_req: Request, res: Response) => {
              await asyncFun();
              reply_success(res, "");
            },
          ],
        },
      ],
    };

    const app = AppBuilder().add_module(module).build();

    // Act
    request(app)
      .get(`/test`)
      .end((_err: any, res: { status: number }) => {
        // Assert
        expect(res.status).toBe(500);

        done();
      });
  });

  test("Should to register a error middleware.", (done) => {
    // Arrange
    const error_handler_response = "get_error_handler_response";
    const error_handler = (_error: any, _req: Request, res: Response) =>
      reply_success(res, error_handler_response);

    const module: Module = {
      name: "test",
      base_url: "/test",
      endpoints: [
        {
          method: "GET",
          endpoint: "/",
          middlewares: [
            async (_req: Request, res: Response) => {
              await asyncFun();
              reply_success(res, "");
            },
          ],
        },
      ],
    };

    const app = AppBuilder().add_module(module).build({ error_handler });

    // Act
    request(app)
      .get(`/test`)
      .end((_err: any, res: { statusMessage: string; status: number }) => {
        // Assert
        expect(res.status).toBe(500);

        done();
      });
  });

  test("Should to add middleware at the top of chain.", (done) => {
    // Arrange
    const msg = "FIRST call";
    const module: Module = {
      name: "test",
      to_add_to_start_of_middleware_chain: [
        (_req: Request, res: Response, next: NextFunction) => {
          res.locals.msg = msg;

          next();
        },
      ],
      base_url: "/test",

      endpoints: [
        {
          method: "GET",
          endpoint: "/",
          middlewares: [
            async (_req: Request, res: Response) =>
              reply_success(res, { msg: res.locals.msg }),
          ],
        },
      ],
    };

    const msg2 = "SECOND call";
    const module2: Module = {
      name: "test2",
      to_add_to_start_of_middleware_chain: [
        (_req: Request, res: Response, next: NextFunction) => {
          res.locals.msg = res.locals.msg + msg2;

          next();
        },
      ],
      base_url: "/test2",
      endpoints: [],
    };

    const app = AppBuilder().add_module(module).add_module(module2).build();

    // Act
    request(app)
      .get(`/test`)
      .end((_err: any, res: { status: number; body: { msg: string } }) => {
        // Assert
        expect(res.status).toBe(200);
        expect(res.body.msg).toBe(msg + msg2);

        done();
      });
  });
});
