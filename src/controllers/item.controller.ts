import { Request, ResponseToolkit } from "@hapi/hapi";
import { ItemService } from "../services/item.service";

const itemService = new ItemService();

export class ItemController {
  static async getAll(request: Request, h: ResponseToolkit) {
    const items = await itemService.getAllItems();
    const formattedItems = items.map((item) => ({
      ...item,
      price: Number(item.price),
    }));

    return h.response(formattedItems).code(200);
  }

  static async getById(request: Request, h: ResponseToolkit) {
    const item = await itemService.getItemById(Number(request.params.id));
    return item
      ? h
          .response({
            ...item,
            price: Number(item.price),
          })
          .code(200)
      : h.response({ message: "Item not found" }).code(404);
  }

  static async create(request: Request, h: ResponseToolkit) {
    const { name, price } = request.payload as {
      name?: string;
      price?: number;
    };

    const item = await itemService.createItem(name!, price!);
    return h.response(item).code(201);
  }

  static async update(request: Request, h: ResponseToolkit) {
    const { name, price } = request.payload as {
      name?: string;
      price?: number;
    };

    const item = await itemService.updateItem(
      Number(request.params.id),
      name!,
      price!
    );

    return item
      ? h.response(item).code(200)
      : h.response({ message: "Item not found" }).code(404);
  }

  static async delete(request: Request, h: ResponseToolkit) {
    const success = await itemService.deleteItem(Number(request.params.id));
    return success
      ? h.response().code(204)
      : h.response({ message: "Item not found" }).code(404);
  }
}
