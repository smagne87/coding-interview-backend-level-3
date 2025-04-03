import { ResponseToolkit, ServerRoute, Request } from "@hapi/hapi";
import { ItemController } from "../controllers/item.controller";
import { itemSchema } from "../validation/item.schema";
import { ValidationError } from "@hapi/joi";

export const itemRoutes: ServerRoute[] = [
  { method: "GET", path: "/items", handler: ItemController.getAll },
  { method: "GET", path: "/items/{id}", handler: ItemController.getById },
  {
    method: "POST",
    path: "/items",
    handler: ItemController.create,
    options: {
      validate: {
        payload: itemSchema,
        failAction: (request: Request, h: ResponseToolkit, error: unknown) => {
          if (error instanceof ValidationError) {
            return h
              .response({
                errors: error.details.map((err) => ({
                  field: err.context?.key,
                  message: err.message,
                })),
              })
              .code(400)
              .takeover();
          }
          return h
            .response({ message: "Internal Server Error" })
            .code(500)
            .takeover();
        },
      },
    },
  },
  {
    method: "PUT",
    path: "/items/{id}",
    handler: ItemController.update,
    options: {
      validate: {
        payload: itemSchema,
        failAction: (request: Request, h: ResponseToolkit, error: unknown) => {
          if (error instanceof ValidationError) {
            return h
              .response({
                errors: error.details.map((err) => ({
                  field: err.context?.key,
                  message: err.message,
                })),
              })
              .code(400)
              .takeover();
          }
          return h
            .response({ message: "Internal Server Error" })
            .code(500)
            .takeover();
        },
      },
    },
  },
  { method: "DELETE", path: "/items/{id}", handler: ItemController.delete },
];
