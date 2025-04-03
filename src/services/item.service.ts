import { AppDataSource } from "../config/dbDataSource";
import { Item } from "../entities/Item.entity";
import { Repository } from "typeorm";

export class ItemService {
  private itemRepository: Repository<Item>;

  constructor() {
    this.itemRepository = AppDataSource.getRepository(Item);
  }

  async getAllItems(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async getItemById(id: number): Promise<Item | null> {
    return await this.itemRepository.findOneBy({ id });
  }

  async createItem(name: string, price: number): Promise<Item> {
    const item = this.itemRepository.create({ name, price });
    return await this.itemRepository.save(item);
  }

  async updateItem(
    id: number,
    name: string,
    price: number
  ): Promise<Item | null> {
    const item = await this.getItemById(id);
    if (!item) return null;

    item.name = name;
    item.price = price;
    return await this.itemRepository.save(item);
  }

  async deleteItem(id: number): Promise<boolean> {
    const result = await this.itemRepository.delete(id);
    return result.affected !== 0;
  }
}
