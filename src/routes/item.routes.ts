import { ServerRoute } from "@hapi/hapi";
import { ItemController } from "../controllers/item.controller";

export const itemRoutes: ServerRoute[] = [
    { method: "GET", path: "/items", handler: ItemController.getAll },
    { method: "GET", path: "/items/{id}", handler: ItemController.getById },
    { method: "POST", path: "/items", handler: ItemController.create },
    { method: "PUT", path: "/items/{id}", handler: ItemController.update },
    { method: "DELETE", path: "/items/{id}", handler: ItemController.delete },
];
